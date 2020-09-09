const mongoose = require('mongoose');

const ErroSchema = new mongoose.Schema({
    // USUARIO
    code: {
        type: String,
    },
    driver: {
        type: String,
    },
    errmsg: {
        type: String,
    },
    index: {
        type: String,
    },
    keyPattern: [],
    keyValue: [],
    message: {
        type: String,
    },
    name: {
        type: String,
    },

}, {
    schema_version: "1",
    timestamps: true
});


/*
UsuarioSchema.pre('save', function() {
    this.senha = md5(this.senha)
})

UsuarioSchema.pre('remove', function() {
    this.senha = md5(this.senha)
})
*/
module.exports = mongoose.model('Erro', ErroSchema);
