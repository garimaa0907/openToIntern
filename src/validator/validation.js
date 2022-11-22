const isValid = function(value){
    if(typeof value ==='undefined' || value ===null)  return false
    if(typeof value ==='string' && value.trim().length ===0)return false
    return true
}

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
const nameInLowerCase = function(name){
    const lowerCaseName= /^[a-z]+(([',. -][a-z ])?[a-z])$/
    return lowerCaseName.test(name)
}

module.exports={isValid, validEmail, validName, validMobile,validLogo,nameInLowerCase}

