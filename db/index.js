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

labadadb.bookPickUp = (bookInfo) => {
    return new Promise((resolve, reject) => {
        conn.query(`INSERT INTO tbl_Orders (Customer_ID,Order_Date,Pickup_Date,Deliver_Date,Amount,Weight,Status,Time) VALUES (?,?,?,?,?,?,?,?)`,
        [bookInfo.Customer_ID, new Date(), bookInfo.Pickup_Date, bookInfo.Deliver_Date, bookInfo.Amount, bookInfo.Weight, bookInfo.Status, bookInfo.Time],
        (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};

labadadb.getOrderHistory = (customerID) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT ord.Order_ID as id, ord.Amount as amount, ord.Pickup_Date as pickup, ord.Deliver_Date as deliver,
        ord.Weight as kilo, ord.Status as status, stat.Status_Desc as statusDesc, ord.Time as time FROM tbl_Orders as ord LEFT JOIN tbl_Status as stat
        ON stat.Status_ID = ord.Status WHERE ord.Customer_ID = ? 
        ORDER BY ord.Order_Date LIMIT 10;`,
        [customerID],
        (err, results) => {
            if(err){
                return reject(err);
            }
            console.log(results);
            return resolve(results);
        });
    });
};

labadadb.getOrderDetails = (orderID) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT Description as itemdesc,Quantity as qty FROM tbl_OrderItems WHERE Order_ID = ?`,
        [orderID],
        (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};

module.exports = labadadb;
