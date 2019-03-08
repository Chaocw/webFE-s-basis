function request(url) {
  var xhr = new XMLHttpRequest()
  xhr.open('post', url, true) 
  xhr.responseType = 'blob'

  xhr.onload = function() {
    if (this.status === 200) {
      //下载
      var blob = this.response
      var reader = new FileReader();
      reader.readAsDataURL(blob)
      reader.onload = function(e) {
        var a = document.createElement('a')
        a.download = 'data.xlsx'
        a.hrf = e.target.result
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      }

      //图片
      var objectURL = URL.createObjectURL(this.response)
      var img = document.createElement('img')

      img.src = objectURL
      img.onload = function(e) {
        window.URL.revokeObjectURL(this.src)
      }
    }
  }

  xhr.send()
}