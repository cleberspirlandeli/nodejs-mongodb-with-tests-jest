const app = require('./app');
//require('dotenv').config();
require('dotenv/config');

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server rodando porta ${process.env.PORT}`);
});