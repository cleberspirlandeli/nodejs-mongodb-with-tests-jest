const Validation = require('../../../Common/config/Validator');

module.exports = {
    UsuarioGet,
    UsuarioPost,
    UsuarioDeleteFotos
};

async function UsuarioGet(usuario) {
    let _validation = new Validation();
    _validation.clear();

    const { _id } = usuario;

    // Id Usuario
    _validation.isRequired(_id, 'O identificado do usuário é obrigatório ou esta inválido');

    // se ja existir o erro não mostrar as mesmas mensagens repitidas
    if(_validation.isValid().isValid)
        _validation.isString(_id, 'O identificado do usuário é obrigatório ou esta inválido');
    
    // se ja existir o erro não mostrar as mesmas mensagens repitidas
    if(_validation.isValid().isValid)
        _validation.isFixedLen(_id, 24, 'O identificado do usuário é obrigatório ou esta inválido')

    // Validar
    return _validation.isValid();
}


async function UsuarioPost(usuario) {
    let _validation = new Validation();
    _validation.clear();

    const { nome, email } = usuario;

    // Nome
    _validation.isRequired(nome, 'O nome do usuário é obrigatório');
    _validation.isString(nome, 'O nome do usuário deve ser um texto');
    _validation.isMinLen(nome, 2, 'O nome do usuário deve ser maior que 2 (dois)');
    _validation.isMaxLen(nome, 100, 'O nome do usuário deve ser menor que 100 (cem)');

    // Email
    _validation.isRequired(email, 'O email do usuário é obrigatório');
    _validation.isEmail(email, 'O email do usuário é inválido');

    // Validar
    return _validation.isValid();
}


async function UsuarioDeleteFotos(usuario) {
    let _validation = new Validation();
    _validation.clear();

    const { _id, fotos } = usuario;

    // Id Usuario
    _validation.isRequired(_id, 'O identificado do usuário é obrigatório ou esta inválido');

    // se ja existir o erro não mostrar as mesmas mensagens repitidas
    if(_validation.isValid().isValid)
        _validation.isString(_id, 'O identificado do usuário é obrigatório ou esta inválido');
    
    // se ja existir o erro não mostrar as mesmas mensagens repitidas
    if(_validation.isValid().isValid)
        _validation.isFixedLen(_id, 24, 'O identificado do usuário é obrigatório ou esta inválido')

    _validation.isRequired(fotos, 'As fotos do usuário é obrigatório ou esta inválido');
    _validation.isObject(fotos, 'As fotos do usuário é inválido')
    
    // Validar
    return _validation.isValid();
}

