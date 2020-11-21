const validator = require('validator')
const isEmpty = require('is-empty')

module.exports = (data)=>{
    let errors={}
    // @-- Convert empty fields to an empty string so we can use validator functions
    data.username = !isEmpty(data.username) ? data.username : ''
    data.password = !isEmpty(data.password) ? data.password :'' 
    data.password2 = !isEmpty(data.password2) ? data.password2 :'' 
    data.email = !isEmpty(data.email) ? data.email :'' 

    // @-- Name checks
    if(validator.isEmpty(data.username)){
        errors.username = "Username is required"
    }

    // @-- Email checks
    if(validator.isEmpty(data.email)){
        errors.email = "Email is required"
    }else if(!validator.isEmail(data.email)){
        errors.email = "Email is invalid"
    }

    // @-- Password checks
    if(validator.isEmpty(data.password)){
        errors.password = "password is required"
    }

    if(validator.isEmpty(data.password2)){
        errors.password2  = "Confirm password is required"
    }

    if(!validator.isLength(data.password, {min: 6, max: 30})){
        errors.password = 'Password must be at least 6 characters'
    }

    if(!validator.equals(data.password, data.password2)){
        errors.password2 = "Password must match"
    }

    return{
        errors,
        isValid: isEmpty(errors)
    }


}