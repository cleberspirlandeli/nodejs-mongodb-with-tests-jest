const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
    // USUARIO
    nome: {
        type: String,
        required: true,
    },
    telefone: {
        type: String,
    },
    interesse: {
        // Homem 
        // Mulher
        // Ambos
        type: String,
        enum: [ "H", "M", "A" ],
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    senha: {
        type: String,
        required: true,
        select: false
    },
    dataNascimento: {
        type: Date,
        required: false,
    },    
    sobre: {
        type: String,
        required: false,
    },
    trabalho: {
        type: String,
        required: false,
    },
    escolaridade: {
        type: String,
        required: false,
    },
    sexo: {
        // Homem
        // Mulher
        type: String,
        enum: [ "H", "M" ],
    },
    fotos: [
        {
            key: {
                type: String,
                required: false,
            },
            url: {
                type: String,
                required: false,
            },
            mimetype: {
                type: String,
                required: false,
            }
        }
    ],
    
    // CONFIGURAÇÕES
    location: {
        type: {
            type: String, 
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            default: []
        }
    },
    distanciaMaxima: {
        type: Number,
        default: 200
    },
    idadeMinima: {
        type: Number,
        default: 18
    },
    idadeMaxima: {
        type: Number,
        default: 100
    },
    mostrarIdade: {
        // 0 = Não
        // 1 = Sim
        type: Number,
        default: 0
    },
    mostrarDistancia: {
        // 0 = Não
        // 1 = Sim
        type: Number,
        default: 0
    },    
    notificarPor: [
        {
            // Email
            // Push Notification 
            // E etc
            tipo: {
                type: String,
                required: false,                
            }
        }
    ],
    notificarQuando: [
        {
            // Novos Matchs
            // Novas Mensagens
            // Novos Likes
            // e etc
            tipo: {
                type: String,
                required: false,                
            }
        }
    ],
    emailAtivo: {
        // 0 = Não
        // 1 = Sim
        type: Number,
        default: 0
    },
    telefoneAtivo: {
        // 0 = Não
        // 1 = Sim
        type: Number,
        default: 0
    },    
    tipoUsuario: {
        // user = usuario
        // admin
        type: String,
        default: "user"
    },
    cadastro: {
        type: Date,
        default: Date.now
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
module.exports = mongoose.model('Usuario', UsuarioSchema);
