
var qrcode=require('qrcode')
var otplib=require('otplib')
const { authenticator } = otplib

const generateUniqueSecret = () => {
  return authenticator.generateSecret()
}

const generateOTPToken = (username, serviceName, secret) => {
  return authenticator.keyuri(username, serviceName, secret)
}

const verifyOTPToken = (token, secret) => {
  try {
    console.log("OTP dung:"+authenticator.generate(secret));
    return authenticator.check(token, secret)
  } catch (error) {
    console.log("LOI")
  }
  
}

const generateQRCode =  (otpAuth) => {
  try {
    const QRCodeImageUrl =  qrcode.toDataURL(otpAuth)
    return QRCodeImageUrl

  } catch (error) {
    console.log('Could not generate QR code', error)
    return
  }
}

module.exports= {
  generateUniqueSecret,
  verifyOTPToken,
  generateOTPToken,
  generateQRCode,
}
