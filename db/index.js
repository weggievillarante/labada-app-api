const mysql = require('mysql');

const conn = mysql.createPool({
    connectionLimit: 10, 
    password: 'D3f@ult!',
    user: 'root',
    database: 'labada_db',
    host: 'localhost',
    port: '3306'
});

let labadadb = {};

labadadb.all = () => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM tbl_Orders`, (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};

labadadb.bookPickUp = (bookInfo) => {
    return new Promise((resolve, reject) => {
        conn.query(`INSERT INTO tbl_Orders (Customer_ID,Order_Date,Pickup_Date,Deliver_Date,Amount,Weight,Status) VALUES (?,?,?,?,?,?,?)`,[bookInfo.Customer_ID, bookInfo.Order_Date, bookInfo.Pickup_Date, bookInfo.Deliver_Date, bookInfo.Amount, bookInfo.Weight, bookInfo.Status], (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};

module.exports = labadadb;