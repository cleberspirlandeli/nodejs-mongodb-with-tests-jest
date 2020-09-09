const express = require('express');
const routes = express.Router();

const ProdutoController = require('../modules/produto/controller/produto.controller');

routes.post('/produto', ProdutoController.ProdutoPost);

module.exports = routes;
