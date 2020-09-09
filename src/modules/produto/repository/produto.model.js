const mongoose = require('mongoose');

const ProdutoSchema = new mongoose.Schema(
    {
        descricao: {
            type: String,
            required: true,
        },
        categoria: {
            type: String,
        },
        preco: {
            type: String,
        },
    },
    {
        schema_version: '1',
        timestamps: true,
    }
);

/*
UsuarioSchema.pre('save', function() {
    this.senha = md5(this.senha)
})

UsuarioSchema.pre('remove', function() {
    this.senha = md5(this.senha)
})
*/
module.exports = mongoose.model('Produto', ProdutoSchema);
