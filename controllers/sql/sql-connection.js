const mysql = require('mysql');

let connectionInstance = null;

function getInstannce() {
    if (!connectionInstance) {
        connectionInstance = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'tsehangadmin',
            database: 'demo',
        })
    }
    connectionInstance.connect((err) => {
        if (!err) {
            console.log('Database is connected ... nn');
        } else {
            console.log('Error connecting database ... nn');
        }
    })
    return connectionInstance
}

module.exports = {
    sqlConnect: new getInstannce(),
}
