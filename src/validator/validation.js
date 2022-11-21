const validEmail=function(email){
    const emailRegex=/\S+@\S+\.\S+/
    return emailRegex.test(email)
}

const validName=function(name){
    const nameRegex=/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/
    return nameRegex.test(name)
}

const validMobile=function(mobile){
    const mobileRegex=/^\d{10}$/
    return mobileRegex.test(mobile)
}
const validLogo = function(logoLink){
    const logoRegex = /^https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif|jfif))$/i
    return logoRegex.test(logoLink)
}
const nameInLowewrCase = function(name){
    const lowerCaseName= /^[a-z]+(([',. -][a-z ])?[a-z])$/
    return lowerCaseName.test(name)
}

module.exports={ validEmail, validName, validMobile,validLogo,nameInLowewrCase}

