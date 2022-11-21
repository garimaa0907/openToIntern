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

module.exports={ validEmail, validName, validMobile}

