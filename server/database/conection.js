
const {Pool} = require('pg');

const config = {
    user: 'gabyscript_user',
    host: 'postgresql-gabyscript.alwaysdata.net',
    database: 'gabyscript_login',
    password: 'desafio_likeme',
    port: 5432,
    allowExitOnIdle: true
}

const pool = new Pool(config);

module.exports = pool;