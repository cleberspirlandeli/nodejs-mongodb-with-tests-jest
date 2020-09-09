module.exports = (app) => {
    // app.all('*', (req, res, next) => {
    //         req.method === "OPTIONS"
    //             ? next()
    //             : Authorize(req, res, next);
    // });

    app.use(require('./usuario.route'));
    app.use(require('./produto.route'));
};
