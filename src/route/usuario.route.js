const express = require('express');
const routes = express.Router();
const multer = require('multer')
const uploadConfig = require('../Common/config/Multer');
const upload = multer(uploadConfig)

const UsuarioController = require('../modules/usuario/controller/usuario.controller');

routes.get('/usuario', UsuarioController.UsuarioGet);
routes.post('/usuario', upload.array('image', 6), UsuarioController.UsuarioPost);
routes.delete('/usuario/fotos', UsuarioController.UsuarioDeleteFotos);

module.exports = routes;
