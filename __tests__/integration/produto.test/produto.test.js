// install this packages -> jest - supertest
// execute test with: npm test
const request = require('supertest');
const app = require('./../../../src/app');

describe('1.0 - Testar Funcionalidades de Produto', () => {
    let _id = null;
    let data = {
        descricao: 'Produto 5',
        categoria: 'FFF',
        preco: '12355',
    };

    it('1.1 - Cadastrar um Produto novo', async () => {
        const response = await request(app)
            .post('/produto')
            .set('Content-Type', 'application/json')
            .send(data);

        // console.log(response.body);

        _id = response.body._id;
        expect(response.status).toEqual(201);
        expect(response.body.descricao).toEqual(data.descricao);
        expect(response.body.categoria).toEqual(data.categoria);
        expect(response.body.preco).toEqual(data.preco);
    });

    it('1.2 - Buscar um Produto por Id', async () => {
        expect(200).toEqual(200);
    });

    it('1.3 - Editar um Produto existente por Id', async () => {
        expect(200).toEqual(200);
    });

    it('1.4 - Deletar um Produto existente por Id', async () => {
        expect(200).toEqual(200);
    });
});
