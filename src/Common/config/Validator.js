/**
 * Created by Cleber Spirlandeli on 21/11/2018.
 */
'use strict'

let errors = [];

function Validation() {
    errors = [];
}

// _value recebe o parametro para ser comparado
Validation.prototype.isRequired = (value, message) => {

    if (
        (!value || value == null || value == undefined || value === "") ||
        (value && typeof value !== 'object' && value.replace(/\s/g, '').length <= 0)
    )
        errors.push({ message: message });
    
}

// _value recebe um número para ser comparado
// _min   recebe um número que deve informar o tamanho mínimo da variável _value
Validation.prototype.isMinLen = (value, min, message) => {
    if (value != null && value.length < min)
        errors.push({ message: message });
}

// _value recebe um número para ser comparado
// _max   recebe um número que deve informar o tamanho máximo da variável _value
Validation.prototype.isMaxLen = (value, max, message) => {
    if (value != null && value.length > max)
        errors.push({ message: message });
}

// _value recebe um número para ser comparado
// _len   recebe um number ou um string 
Validation.prototype.isFixedLen = (value, len, message) => {
    if (!value || value.length != len) // é comparado somente o tamanho entre as duas variáveis
        errors.push({ message: message });
}

// _value recebe um string para ser comparado
Validation.prototype.isEmail = (value, message) => {
    var reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
    if (!reg.test(value))
        errors.push({ message: message });
}

// _value recebe um string para ser comparado
Validation.prototype.isString = (value, message) => {
    if (value != null && typeof value !== 'string')
        errors.push({ message: message });
}

// _value recebe um number para ser comparado
Validation.prototype.isNumber = (value, message) => {
    if (value != null && typeof value !== 'number')
        errors.push({ message: message });
}

// _value recebe um strig para ser comparado se é igual 'S' ou 'N'
Validation.prototype.isYesOrNo = (value, message) => {
    if (value != null && (value !== "S" && value !== "N"))
        errors.push({ message: message });
}

// _value recebe um strig para ser comparado
// _eq    recebe um string
Validation.prototype.isEqual = (value, eq, message) => {
    if (value != null && value !== eq) // é comparado somente se o conteúdo é igual
        errors.push({ message: message });
}

// _value recebe um strig CPF para ser comparado
Validation.prototype.isCpf = (value, message) => {
    // Mascara de CPF
    let maskCpf = /[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}/;
    if (!maskCpf.test(value)) {
        errors.push({ message: message });
    }
}

// _value recebe um strig CPF para ser comparado
Validation.prototype.isObject = (value, message) => {
    if(value && typeof value !== 'object')
        errors.push({ message: message })
}

// retorna os erros encontrados
Validation.prototype.errors = () => {
    return errors;
}

// limpa a variável de erros
Validation.prototype.clear = () => {
    errors = [];
}

// return true ou false
Validation.prototype.isValid = () => {
    //return errors.length == 0;
    if(errors.length == 0) {
        return {isValid: true}
    } else {
        return {isValid: false, errors}
    }
}

module.exports = Validation;