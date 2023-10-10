// import mysql from 'mysql2';
const mysql = require('mysql2');

const config = require('config-lite')({
    config_dir: 'config',
    config_basedir: __dirname,
});

class Database {
    constructor() {
        this.database = null;
        this.init();
    }
    init() {
        const { host, user, password, database } = config.database || {};
        console.log('host', host)
        this.database = mysql.createConnection({
            host,
            user,
            password,
            database,
        });
        this.database.connect((err) => {
            console.log('database connect err', err)
        })
        this.database.on('error', (err) => {
            console.log('err', err)
        })
        // 监听node进程是否关闭
        // process.on('SIGINT', () => {
        //     console.log('close mysql conect')
        //     this.database.end();
        // });
    }
    query(sql, cb = () => {}) {
        this.database.query(sql, (err, result) => {
            if (!err) {
                cb({ data: result })
            } else {
                cb({ err })
            }
        })
    }
}

// module.exports = { Database }
export default Database
