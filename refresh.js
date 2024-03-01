	// 版本号文件
  const filePath = path.resolve(`./public`, 'manifest.json')
  // 读取文件内容
  readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('读取文件时出错:', err)
      return
    }
    // 将文件内容转换JSON
    const dataObj = JSON.parse(data)
    dataObj.timestamp = new Date().getTime()
    // 将修改后的内容写回文件
    writeFile(filePath, JSON.stringify(dataObj), 'utf8', err => {
      if (err) {
        console.error('写入文件时出错:', err)
        return
      }
    })
  })


  import router from '@/router'
  import { Modal } from 'ant-design-vue'
  if (process.env.NODE_ENV === 'production') {
    let lastEtag = ''
    let hasUpdate = false
    let worker = null
  
    async function checkUpdate() {
      try {
        // 检测前端资源是否有更新
        let response = await fetch(`/manifest.json?v=${Date.now()}`, {
          method: 'head'
        })
        // 获取最新的etag
        let etag = response.headers.get('etag')
        hasUpdate = lastEtag && etag !== lastEtag
        lastEtag = etag
      } catch (e) {
        return Promise.reject(e)
      }
    }
  
    async function confirmReload(msg = '', lastEtag) {
      worker &&
        worker.postMessage({
          type: 'pause'
        })
      try {
        Modal.confirm({
          title: '温馨提示',
          content: '系统后台有更新，请点击“立即刷新”刷新页面\n' + msg,
          okText: '立即刷新',
          cancelText: '5分钟后提示我',
          onOk() {
            worker.postMessage({
              type: 'destroy'
            })
            location.reload()
          },
          onCancel() {
            worker &&
              worker.postMessage({
                type: 'recheck',
                lastEtag: lastEtag
              })
          }
        })
      } catch (e) {}
    }
  
    // 路由拦截
    router.beforeResolve(async (to, from, next) => {
      next()
      try {
        await checkUpdate()
        if (hasUpdate) {
          worker.postMessage({
            type: 'destroy'
          })
          location.reload()
        }
      } catch (e) {}
    })
  
    // 利用worker轮询
    worker = new Worker(
      /* webpackChunkName: "checkUpdate.worker" */ new URL('../worker/checkUpdate.worker.js', import.meta.url)
    )
  
    worker.postMessage({
      type: 'check'
    })
    worker.onmessage = ({ data }) => {
      if (data.type === 'hasUpdate') {
        hasUpdate = true
        confirmReload(data.msg, data.lastEtag)
      }
    }
  }
  
  
