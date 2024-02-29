class Promise {
  constructor(fn) {
    this.resolveTask = []
    this.rejectTask = []
    this.state = 'pending'
    this.data = null
    this.error = null

    let resolve = value => {
      if (this.state !== 'pending') return
      this.state = 'fulfilled'
      this.data = value
      setTimeout(() => {
        this.resolveTask.forEach((cb) => cb(value)) 
      });
    }
    let reject = err => {
      if (this.state !== 'pending') return
      this.state = 'rejected'
      this.error = err
      setTimeout(() => {
        this.rejectTask.forEach(cb => cb(err)) 
      });
    }

    try {
      fn(resolve, reject)
    } catch(err) {
      reject(err)
    }
  }

  then(resolveCallback, rejectCallback) {
    return new Promise((resolve, reject) => {
      this.resolveTask.push(() => {
        const res = resolveCallback(this.data)
        if (res instanceof Promise) {
          res.then(resolve, reject)
        } else {
          resolve(res)
        }
      })

      this.rejectTask.push(() => {
        const res = rejectCallback(this.error)
        if (res instanceof Promise) {
          res.then(resolve, reject)
        } else {
          reject(res)
        }
      })
    })
  }
}