if (Object.keys(navigator).includes('serviceWorker')) {
  window.onload = function () {
    navigator.serviceWorker.register('/serviceWorker.js')
  }
}
