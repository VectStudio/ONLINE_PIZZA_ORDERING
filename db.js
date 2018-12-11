var mysql = require('mysql');
var fs = require('fs');
var connection;

exports.connect = function () {
    connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        ssl: {
            ca: fs.readFileSync('ca.pem')
        }
    })
}

exports.get = function () {
    return connection;
}

exports.esc = function (str) {
    return connection.escape(str).replace(/['"]+/g, '');
}