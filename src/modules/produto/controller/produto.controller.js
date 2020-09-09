//const ProdutoValidation = require('../validation/');
const ProdutoRepository = require('../repository/produto.repository');

module.exports = {
    ProdutoPost,
};

async function ProdutoPost(req, res) {
    const { descricao, categoria, preco } = req.body;

    // regras de negocio

    const data = {
        descricao,
        categoria,
        preco,
    };

    const produto = await ProdutoRepository.Create(data);

    return res.status(201).json(produto);
}
