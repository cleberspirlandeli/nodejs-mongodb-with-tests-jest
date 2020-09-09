const jwt = require('jsonwebtoken');
const Return = require("./ReturnFromRequest");

module.exports = { 
    GenerateToken,
    Authorize
}

async function GenerateToken({ _id, name, email }) {
    const tokenVersion = process.env.TOKEN_VERSION;
    
    const token = jwt.sign({ _id, name, email, tokenVersion }, process.env.SALT_KEY_JWT, {
        expiresIn: '1d' // expires in 24 hours
    });

    return `Bearer ${token}`;
}

async function Authorize(req, res, next) {
    const authorization = req.headers['Authorization'] || req.body.token || req.query.token;

    const [prefix, token] = authorization.split(' ');

    if (prefix !== 'Bearer' || !token) {
        Return.Unauthorized(res);
    } 

    jwt.verify(token, process.env.SALT_KEY_JWT, (err, decoded) => {
        if (err || decoded.tokenVersion !== process.env.TOKEN_VERSION) {
            Return.Unauthorized(res);
        } 

        req.body.token = decoded;
        next();
    });
}