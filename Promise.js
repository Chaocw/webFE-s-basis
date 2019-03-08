function Promise(fn) {
  var handlers = []
  var state = 'pending'
  var value = null
  this.then = function (onResolved, onRejected) {
    return new Promise(function (resolve, reject) {
      handle({
        onResolved: onResolved,
        onRejected: onRejected,
        resolve: resolve,
        reject: reject
      })
    })
  }

  function handle(handler) {
    if (state === 'pending') {
      handlers.push(handler)
    } else if (state === 'fulfilled') {
      if (handler.onResolved) {
        try {
          var ret = handler.onResolved(value)
          handler.resolve(ret)
        } catch (e) {
          handler.reject(e)
        }
      } else {
        handler.resolve(value)
      }
    } else {
      if (handler.onRejected) {
        try {
          var ret = handler.onRejected(value)
          // 因为前一个 promise 中有处理 reject 的情况
          // 所以要调用下一个 promise 的 resolve
          handler.resolve(ret)
        } catch (e) {
          handler.reject(e)
        }
      } else {
        handler.reject(value)
      }
    }
  }

  function resolve(newValue) {
    try {
      if (typeof newValue === 'object' && typeof newValue.then === 'function') {
        // resolve 就是当前这个定义的函数
        newValue.then(resolve, reject)
      } else {
        value = newValue
        state = 'fulfilled'
        setTimeout(function () {
          handlers.forEach(function (handler) {
            handle(handler)
          })
        }, 0)
      }
    } catch (e) {
      reject(e)
    }
  }

  function reject(reason) {
    value = reason
    state = 'rejected'
    setTimeout(function () {
      handlers.forEach(function (handler) {
        handle(handler)
      })
    }, 0)
  }
  fn(resolve, reject)
}

var promise = new Promise(function (x, y) {
  x(101)
})
console.log(232)
promise.then((z) => {
  console.log(z) // 101
})