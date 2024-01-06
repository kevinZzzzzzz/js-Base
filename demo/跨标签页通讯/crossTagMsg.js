const channel =  new BroadcastChannel('demo')

function sendMsg(type, content) {
  channel.postMessage({
    type,
    content
  })
}

function listenMsg(cb) {
  channel.addEventListener('message', (e) => {
    cb(e.data)
    return () => {
      channel.removeEventListener('message', cb)
    }
  })
}
