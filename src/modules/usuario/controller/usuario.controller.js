const UsuarioValidation = require("../validation/usuario.validation");
const UsuarioRepository = require("../repository/usuario.repository");
const { OK, BadRequest, Created } = require("../../../Common/config/ReturnFromRequest");
const md5 = require('md5');
const aws = require('aws-sdk');
const s3 = new aws.S3();
const AppError = require('./../../../Common/middlewares/appError')


module.exports = {
    UsuarioGet,
    UsuarioPost,
    UsuarioDeleteFotos,
    // UsuarioEdit,
    // UsuarioPut,
};

async function UsuarioGet (req, res) {
    
    let dto = {
        _id: req.query.usuario
    }

    const validarCampos = await UsuarioValidation.UsuarioGet(dto);

    if(!validarCampos.isValid){
        return BadRequest(res, validarCampos.errors);
    }

    const filtros = {
        where: {
            _id: dto._id
        }
    }

    const usuario = await UsuarioRepository.GetById(filtros);

    return OK(res, usuario);
}


async function UsuarioPost (req, res){

    let dto = {
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha ? md5(req.body.senha + process.env.SALT_KEY_PASSWORD) : null,
        sexo: req.body.sexo,
        interesse: req.body.interesse,
        confirmouIdadeMinima: req.body.confirmouIdadeMinima, // TO DO 18 anos
        location: {            
            coordinates: [-21.181946, -47.803884] 
        },
        fotos: req.files.map(foto => {
            return {
                key: foto.key,
                url: foto.location,
                mimetype: foto.mimetype
            }
        }),
    };

    const validarCampos = await UsuarioValidation.UsuarioPost(dto);

    if(!validarCampos.isValid){
        return BadRequest(res, validarCampos.errors);
    }

    const novoUsuario = await UsuarioRepository.Create(dto);

    return Created(res, novoUsuario);
}

async function UsuarioDeleteFotos (req, res) {
    
    const dto = {
        _id: req.body._id,
        fotos: req.body.fotos
    }

    const validarCampos = await UsuarioValidation.UsuarioDeleteFotos(dto);

    if(!validarCampos.isValid){
        return BadRequest(res, validarCampos.errors);
    }

    dto.fotos.map(foto => {
        s3.deleteObject({
            Bucket: process.env.AWS_BUCKET,
            Key: foto.key
        })
        .promise()
    });

    if(dto.fotos.length > 0)
        await UsuarioRepository.DeleteFotos(dto)

    return OK(res)
}