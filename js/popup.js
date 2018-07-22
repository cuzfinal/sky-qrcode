class Popup {
  constructor() {
    this.input = this.get('.input')
    this.code = this.get('.code')
    this.err = this.get('.err')
    this.qrcode = new QRCode(this.code, {
      width: 300,
      height: 300,
      colorDark : '#000000',
      colorLight : '#ffffff',
      correctLevel : QRCode.CorrectLevel.H
    })
    this.init()
  }

  async init () {
    this.input.addEventListener('keyup', e => {
      if(e.keyCode === 13)
        this.setCode()
    })
    this.input.value = await this.getUrl()
    this.setCode()
  }

  setCode () {
    this.qrcode.clear()
    this.err.style.display = 'none'
    try{
      this.qrcode.makeCode(this.input.value)
    } catch (e) {
      this.err.style.display = ''
    }
  }

  get (selector) {
    return document.querySelector(selector)
  }

  getUrl() {
    return new Promise((resolve, reject) => {
      browser.windows.getCurrent(w => {
        browser.tabs.query({
          active: true,
          windowId: w.id
        }, tabs => resolve(tabs[0].url))
      })
    })
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const popup = new Popup()
})