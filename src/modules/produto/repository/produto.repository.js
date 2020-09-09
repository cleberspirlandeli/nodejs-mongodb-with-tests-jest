const ProdutoModel = require('./produto.model');

module.exports = {
    GetById,
    GetGeoLocation,
    GetAll,
    GetOne,
    Create,
    DeleteById,
    Update,
    DeleteFotos,
};

async function GetById(filtros) {
    const { where = {}, select = {} } = filtros;
    return await ProdutoModel.findById(where, select);
}

async function GetGeoLocation() {
    return await ProdutoModel.find({
        location: {
            $near: {
                $geometry: {
                    type: 'Point',
                    coordinates: [-20.545017, -47.420492],
                },
                $maxDistance: 200 * 1000,
            },
        },
    });
}

async function GetAll(filtros) {
    const { where = {}, select = {} } = filtros;
    return await ProdutoModel.find(where, select);
}

async function GetOne(filtros) {
    const { where = {}, select = {} } = filtros;
    return await ProdutoModel.findOne(where, select);
}

async function Create(produto) {
    return await ProdutoModel.create(produto);
}

async function DeleteById({ _id }) {
    return await ProdutoModel.findByIdAndDelete(_id);
}

async function Update(usuario) {
    const dto = {
        _id: usuario._id,
        nome: usuario.nome,
        email: usuario.email,
        senha: usuario.senha,
        ativo: usuario.ativo,
        cadastro: usuario.cadastro,
        fotos: usuario.fotos,
    };

    return await ProdutoModel.updateOne(
        {
            _id: dto._id,
        },
        {
            $set: dto,
        }
    );
}

async function DeleteFotos(dto) {
    const filtros = {
        where: {
            _id: dto._id,
        },
        select: {
            fotos: 1,
        },
    };

    let usuario = await GetById(filtros);

    let fotosAntigas = [];
    dto.fotos.map((foto) => {
        fotosAntigas.push(foto.key);
    });

    let novasFotos = usuario.fotos.filter((foto) => {
        return !fotosAntigas.includes(foto.key);
    });

    usuario.fotos = novasFotos;
    usuario.save();

    return;
}
