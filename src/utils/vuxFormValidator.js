import { isNotEmpty } from './myUtils'

const accountPattern = /^[a-zA-Z0-9_-]{4,16}$/
const accountErrorMsg = '用户名为4到16位（字母，数字，下划线，减号）'
const passwordPattern = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/
const passwordErrorMsg = '密码格式为6到16为数字和字母的组合'
const phonePattern = /^[1][3,4,5,6,7,8][0-9]{9}$/
const phoneErrorMsg = '手机号码格式不正确'
const securityCodePattern = /^\d{4}$/
const securityCodeErrorMsg = '请输入正确的验证码'
const moneyPattern = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
const moneyErrorMsg = '请输入正确的金额'

const validateType = (value, pattern, errorMsg) => {
    return {
        valid: pattern.test(value),
        msg: errorMsg
    }
}

// 非空验证
export const validateTypeNotNull = (value) => {
    if (isNotEmpty(value)) {
        return {
            valid: true,
            msg: ''
        }
    } else {
        return {
            valid: false,
            msg: '不能为空'
        }
    }
}

// 用户名验证
export const validateTypeAccount = (value) => {
    return validateType(value, accountPattern, accountErrorMsg)
}
// 密码验证
export const validateTypePassword = (value) => {
    return validateType(value, passwordPattern, passwordErrorMsg)
}
// 手机号码验证
export const validateTypePhone = (value) => {
    return validateType(value, phonePattern, phoneErrorMsg)
}
// 手机验证码验证
export const validateTypeSecurityCode = (value) => {
    return validateType(value, securityCodePattern, securityCodeErrorMsg)
}
// 金额验证
export const validateTypeMoney = (value) => {
    return validateType(value, moneyPattern, moneyErrorMsg)
}
