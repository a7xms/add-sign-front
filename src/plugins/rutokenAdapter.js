class RutokenAdapter {
  plugin = null;
  device = null;

  async init(){
    try {
      await rutoken.ready;
      let isExtInst = await rutoken.isExtensionInstalled();
      if (!isExtInst)
        throw new Error('Расширение для браузера не установлено');

      let isPluginInst = await rutoken.isPluginInstalled();
      if (!isPluginInst)
        throw new Error('Плагин Рутокен не установлен');

      this.plugin = await rutoken.loadPlugin();
    } catch (e) {
      this.processError(e);
      throw 'cannot init'
    }
  }

  async getTokens() {
    try {
      let devices = await this.plugin.enumerateDevices();
      let deviceLabels = await Promise.all(devices.map(dev =>
        this.plugin.getDeviceInfo(dev, this.plugin.TOKEN_INFO_LABEL)
      ));
      let deviceInfo = devices.map((id, idx) => ({id, label: deviceLabels[idx]}))
      return deviceInfo
    } catch (e) {
      this.processError(e)
    }
  }

  setDevice(dev){
    this.device = dev;
  }

  setCert(certId) {
    this.certId = certId
  }

  async isLoggedIn(){
    try {
      return await this.plugin.getDeviceInfo(this.device, this.plugin.TOKEN_INFO_IS_LOGGED_IN);
    } catch (e) {
      this.processError(e)
    }
  }

  async login(pin){
    try {
      await this.plugin.login(this.device, pin);
      return true;
    } catch (e) {
      this.processError(e)
      return false
    }
  }

  async getCerts(){
    try {
      let [a, b, c, d] = await Promise.all([
        this.plugin.enumerateCertificates(this.device, this.plugin.CERT_CATEGORY_UNSPEC),
        this.plugin.enumerateCertificates(this.device, this.plugin.CERT_CATEGORY_CA),
        this.plugin.enumerateCertificates(this.device, this.plugin.CERT_CATEGORY_OTHER),
        this.plugin.enumerateCertificates(this.device, this.plugin.CERT_CATEGORY_USER),
      ]);

      return [].concat(a, b, c, d);

    } catch (e) {
      this.processError(e)
    }
  }

  async getCert(){
    try{
      let res = await this.plugin.getCertificate(this.device, this.certId);
      return res;
    }
    catch (e){
      this.processError(e);
    }
  }

  async sign(data, format = this.plugin.DATA_FORMAT_PLAIN) {
    const options = {
      addSignTime: true,
      addUserCertificate: true
    }
    // const options = {
    //   computeHash: true,
    //   useHardwareHash: false,
    //   hashAlgorithm: this.plugin.HASH_TYPE_GOST3411_94
    // }
    // debugger
    try {
      // let key = await this.plugin.getKeyByCertificate(this.device, this.certId)
      // let res = await this.plugin.rawSign(this.device, key, data, options);
      return await this.plugin.sign(this.device, this.certId, data, format, options);

      // return res.split(':').join('')

    } catch (e) {
      this.processError(e)
    }
  }

  async verify(cms, options) {
    options = options || {
      // certificates: [cert],
      // CA: [storeCert0],
      verifyCertificate: false,
    }

    try {
      return await this.plugin.verify(this.device, cms, options)

    } catch (e) {
      this.processError(e)
    }
  }

  processError(e){
    console.error(e);

    if (isFinite(e.message)) {
      let err = Object.keys(this.plugin.errorCodes).find(k => this.plugin.errorCodes[k].toString() === e.message)
      // console.error('err', err);
      // debugger
      alert(err)
    } else {
      alert(e.message)
    }
  }
}

let adapter;
let devices;

async function initToken() {
  adapter = new RutokenAdapter();
  await adapter.init();


  $(document).on('change', '#availableDevices', selectDevice)
  $(document).on('click', '#signIn', onLoginSubmit);
  $(document).on('click', '#signSubmitBtn', onSignSubmit)
  $(document).on('change', '#availableCertificates', selectCert);
  $(document).on('click', '#reloadDevices', loadTokens)


  loadTokens()
}

async function loadTokens() {
  $('#availableDevicesCont').hide();
  $('#availableCertificates').hide();
  $('#availableDevicesLoading').show();
  $('#availableCertificatesLoading').show();

  devices = await adapter.getTokens();
  console.log('devices', devices);

  if (!devices.length) {
    alert('Устройства не найдены');
    return
  }

  let elDevices = $('#availableDevices');
  elDevices.html('');
  devices.forEach((dev, i) => {
    $(`<option value="${i}">${escapeHTML(dev.label)}</option>`).appendTo(elDevices)
  });

  $('#availableDevicesCont').show();
  $('#availableDevicesLoading').hide();

  await setToken(0)
}

const escapeHTML = str => str.replace(/[&<>'"]/g,
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag]));

function selectDevice(e) {
  setToken(e.target.value)
  // debugger
}

function selectCert(e) {
  adapter.setCert(e.target.value);
}

async function setToken(i) {
  adapter.setDevice(devices[i].id);

  await checkLogin();
  await loadCerts();
}

async function loadCerts() {
  let elCerts = $('#availableCertificates');
  let elCertsLoading = $('#availableCertificatesLoading');

  elCerts.html('');
  elCerts.hide();
  elCertsLoading.show();

  let certs = await adapter.getCerts();

  if (certs.length) {
    adapter.setCert(certs[0])
  }

  certs.forEach(cert => {
    $(`<option value="${cert}">${cert}</option>`).appendTo(elCerts)
  })

  elCerts.show();
  elCertsLoading.hide();
}

async function checkLogin() {
  let isLogin = await adapter.isLoggedIn();

  if (isLogin) {
    $('#pinCodeLogin').show()
    $('#pinCodeContainer').hide()
    $('#pinCodeEnterContainer').hide()
    $('#pinCodeError').hide()
    $('#signSubmitBtnCont').show()

    let msg = $('#xmlfile').val();
    console.log("msg", msg);
    PF('rutokenDialog').hide();
    $('#saveTable').click();
    $('.fillClass').click();
    $('#sign-and-submit').click();



  } else {
    $('#pinCodeLogin').hide()
    $('#pinCodeContainer').show()
    $('#pinCodeEnterContainer').show()
    $('#pinCodeError').hide()
    $('#signSubmitBtnCont').hide()
    $('#pinCode').val('')

  }
}

async function onLoginSubmit(e) {
  // debugger
  e.preventDefault();

  $('#pinCodeError').hide()

  let pin = $('#pinCode').val();

  let res = await adapter.login(pin);

  if (res) {
    // debugger
    checkLogin();

  } else {
    $('#pinCodeError').show()
  }

}

async function onSignSubmit() {
  // debugger
  let msg = $('#signMessage').val();
  console.log('msg', msg)
  let cms = await adapter.sign(msg);
  $('#signedPrice').val(cms);
}