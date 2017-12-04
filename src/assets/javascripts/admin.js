document.addEventListener('DOMContentLoaded', function () {
  const fileInputs = document.querySelectorAll('.js-fileupload')

  function uploadFile (fileInput) {
    if (fileInput.files.length === 0) return

    const wrapper = fileInput.parentNode

    const formData = new window.FormData()
    formData.append('file', fileInput.files[0])
    formData.append('_csrf', document.querySelector('[name="_csrf"]').value)

    const request = new window.XMLHttpRequest()
    request.onreadystatechange = function () {
      if (request.readyState !== 4) return

      if (request.status === 201) {
        const resp = JSON.parse(request.response)
        console.log(resp)

        wrapper.querySelector('.js-img').src = resp.full_name
        wrapper.querySelector('.js-file-text').value = resp.file

        document.querySelectorAll('[name="_csrf"]').forEach(input => { input.value = resp.csrf_token })
      } else {
        console.log(request.responseText)
      }
    }

    const pbar = wrapper.querySelector('.js-pbar')
    request.upload.addEventListener('progress', function (e) {
      const progress = Math.ceil(e.loaded / e.total * 100)
      pbar.style.width = `${progress}%`
    }, false)
    request.open('post', fileInput.dataset.path)
    request.send(formData)
  }

  fileInputs.forEach((input) => {
    input.addEventListener('change', () => { uploadFile(input) })
  })
})
