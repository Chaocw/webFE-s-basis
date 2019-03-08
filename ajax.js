function getJSON (url) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest()
    xhr.open('get', url, true)
    xhr.send()
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          try {
            var response = JSON.parse(xhr.responseText)
            resolve(response)
          } catch (e) {
            reject(e)
          }
        } else {
          reject(new Error(xhr.responseText))
        }
      }
    }
  })
}

function renderAll () {
  return Promise.race([getJSON(url), getJSON(url1)])
}

renderAll().then((value)=>console.log(value))