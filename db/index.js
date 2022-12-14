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
        ORDER BY ord.Order_Date DESC LIMIT 10;`,
        [customerID],
        (err, results) => {
            if(err){
                return reject(err);
            }
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

labadadb.Register = (basicInfo) => {
    return new Promise((resolve, reject) => {
        conn.query(`INSERT INTO tbl_Customers (lastname,firstname,email,mobilephone,address,password) VALUES (?,?,?,?,?,?)`,
        [basicInfo.lastname, basicInfo.firstname, basicInfo.email, basicInfo.phonenumber, basicInfo.address, basicInfo.password],
        (err, results) => {
            if(err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

labadadb.Login = (credentials) => {
    return new Promise(
        (resolve , reject) => {
            conn.query(`SELECT * FROM tbl_Customers WHERE mobilephone = ? and password = ?`,
            [credentials.mobilephone,credentials.password],
            (err, results) => {
                if(err){
                    return reject(err);
                }
                return resolve(results);
            }
            );
        }
    );
};

labadadb.CheckMobile = (mobile) => {
    return new Promise(
        (resolve, reject) => {
            conn.query(`SELECT * FROM tbl_Customers WHERE mobilephone = ?`,
            [mobile.mobilephone],
            (err, results) => {
                if(err){
                    return reject(err);
                }
                return resolve(results);
            }
            );
        }
    );
}

labadadb.adminLogin = (user) => {
    return new Promise(
        (resolve, reject) => {
            conn.query(`SELECT * FROM tbl_Users WHERE username = ? AND password = ?`,
            [user.username, user.password],
            (err, results) => {
                if(err){
                    return reject(err);
                }
                return resolve(results);
            });
        }
    );
}

labadadb.getOrders = () => {
    const date = new Date().toISOString().split('T')[0];
    return new Promise(
        (resolve, reject) => {
            conn.query(`SELECT ord.*, cust.address, cust.mobilephone, CONCAT(cust.firstname,' ',cust.lastname) as fullname FROM tbl_Orders as ord LEFT JOIN tbl_Customers as cust ON cust.customer_ID = ord.Customer_ID WHERE Pickup_Date <= ? AND Status in (1,3)`,
            [date],
            (err, results) => {
                if(err){
                    return reject(err);
                }
                return resolve(results);
            });
        }
    );
}

labadadb.getItemList = () => {
    return new Promise(
        (resolve, reject) => {
            conn.query(`SELECT *, 0 as qty FROM tbl_Items`,
            [],
            (err, results) => {
                if(err){
                    return reject(err);
                }
                return resolve(results);
            });
        }
    );
}

labadadb.getServices = () => {
    return new Promise(
        (resolve, reject) => {
            conn.query(
                `SELECT * FROM tbl_Services`,
                [],
                (err, results) => {
                    if(err){
                        return reject(err);
                    }
                    return resolve(results);
                }
            );
        }
    );
}

labadadb.updateOrderAsProcessing = (orderInfo) => {
    console.log(orderInfo);
    return new Promise((resolve, reject) => {
        conn.query(`UPDATE tbl_Orders SET Amount = ?, Weight = ?, Status = 2, Service_ID = ?, Rider_ID = ? WHERE Order_ID = ?`,
        [orderInfo.amount, orderInfo.weight, orderInfo.serviceid, orderInfo.riderid ,orderInfo.order.Order_ID],
        (err, results) => {
            if(err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
}

labadadb.insertOrderItems = (orderItemsInfo) => {
    let strVALUES = ""; 

    for (let i = 0; i < orderItemsInfo.orderitems.length; i++) {
        if(i === 0){
            if(orderItemsInfo.orderitems[i].qty !== 0){
                strVALUES += "(" + orderItemsInfo.order.Order_ID + "," + orderItemsInfo.order.Customer_ID + ",'" + orderItemsInfo.orderitems[i].itemdesc + "'," + orderItemsInfo.orderitems[i].qty + ")";
            }
        } else {
            if(orderItemsInfo.orderitems[i].qty !== 0){
                strVALUES += ",(" + orderItemsInfo.order.Order_ID + "," + orderItemsInfo.order.Customer_ID + ",'" + orderItemsInfo.orderitems[i].itemdesc + "'," + orderItemsInfo.orderitems[i].qty + ")";
            }
        }
    }

    return new Promise((resolve, reject) => {
        conn.query(`INSERT INTO tbl_OrderItems (Order_ID, Customer_ID, Description, Quantity) VALUES ${strVALUES}`,
        [strVALUES],
        (err, results) => {
            if(err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
}

labadadb.getAdminOrders = () => {
    //const date = new Date().toISOString().split('T')[0];
    return new Promise(
        (resolve, reject) => {
            conn.query(`SELECT ord.*, cust.address, cust.mobilephone, CONCAT(cust.firstname,' ',cust.lastname) as fullname, stat.Status_Desc FROM tbl_Orders as ord LEFT JOIN tbl_Customers as cust ON cust.customer_ID = ord.Customer_ID LEFT JOIN tbl_Status as stat ON stat.Status_ID = ord.Status WHERE Status in (2)`,
            [],
            (err, results) => {
                if(err){
                    return reject(err);
                }
                return resolve(results);
            });
        }
    );
}

labadadb.updateOrderAsDelivery = (orderID) => {
    return new Promise((resolve, reject) => {
        conn.query(`UPDATE tbl_Orders SET Status = 3 WHERE Order_ID = ?`,
        [orderID],
        (err, results) => {
            if(err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
}

labadadb.updateDelivered = (orderID) => {
    const date = new Date().toISOString().split('T')[0];
    return new Promise((resolve, reject) => {
        conn.query(`UPDATE tbl_Orders SET Status = 4, Deliver_Date = ? WHERE Order_ID = ?`,
        [date, orderID],
        (err, results) => {
            if(err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
}

labadadb.getAdminOrdersHistory = () => {
    //const date = new Date().toISOString().split('T')[0];
    return new Promise(
        (resolve, reject) => {
            conn.query(`SELECT ord.*, cust.address, cust.mobilephone, CONCAT(cust.firstname,' ',cust.lastname) as fullname, stat.Status_Desc FROM tbl_Orders as ord LEFT JOIN tbl_Customers as cust ON cust.customer_ID = ord.Customer_ID LEFT JOIN tbl_Status as stat ON stat.Status_ID = ord.Status WHERE ord.Status in (3,4) Order by ord.Status, ord.Deliver_Date desc`,
            [],
            (err, results) => {
                if(err){
                    return reject(err);
                }
                return resolve(results);
            });
        }
    );
}

labadadb.getItemQuantity = () => {
    //const date = new Date().toISOString().split('T')[0];
    return new Promise(
        (resolve, reject) => {
            conn.query(`SELECT Description, SUM(Quantity) as Qty FROM tbl_OrderItems Group by Description`,
            [],
            (err, results) => {
                if(err){
                    return reject(err);
                }
                return resolve(results);
            });
        }
    );
}

labadadb.getSales = () => {
    //const date = new Date().toISOString().split('T')[0];
    return new Promise(
        (resolve, reject) => {
            conn.query(`SELECT serv.servicename, SUM(ord.Amount) as Total FROM labada_db.tbl_Orders as ord left join labada_db.tbl_Services serv ON serv.serviceid = ord.Service_ID WHERE ord.Status = 4 group by serv.servicename`,
            [],
            (err, results) => {
                if(err){
                    return reject(err);
                }
                return resolve(results);
            });
        }
    );
}

module.exports = labadadb;
