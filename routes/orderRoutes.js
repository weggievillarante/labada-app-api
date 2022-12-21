const express = require('express');
const db = require('../db');

const router = express.Router();

//Customer Routes
router.post('/booking', async (req, res, next) => {
    try {
        let results = await db.bookPickUp(req.body);
        res.json(results);
    } catch (err) {
        res.sendStatus(500);
    }
});

router.post('/getOrderHistory', async (req, res, next) => {
    try {
        let results = await db.getOrderHistory(req.body.customerid);
        res.json(results);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

router.post('/getOrderDetails', async (req, res, next) => {
    try {
        let results = await db.getOrderDetails(req.body.orderid);
        res.json(results);
    } catch (err) {
        res.sendStatus(500);
    }
}); 

router.post('/register', async (req, res, next) => {
    try {
        //console.log(req.body);
        let results = await db.Register(req.body);
        res.json(results);
    } catch (err) {
        res.sendStatus(500);
    }
});

router.post('/login', async (req, res, next) => {
    try {
        let results = await db.Login(req.body);
        let resObject = results[0];
        if(resObject){
            res.json(resObject);
        } else {
            res.json({});
        }
    } catch (err) {
        res.sendStatus(500);
    }
});

router.post('/checkmobile', async (req, res, next) => {
    try {
        let results = await db.CheckMobile(req.body);
        let resObject = results[0];
        if(resObject){
            res.json(resObject);
        } else {
            res.json({});
        }
    } catch (err) {
        res.sendStatus(500);
    }
});

router.post('/adminlogin', async (req, res, next) => {
    try {
        let results = await db.adminLogin(req.body);
        let resObject = results[0];
        if(resObject){
            res.json(resObject);
        } else {
            res.json({});
        }
    } catch (err) {
        res.sendStatus(500);
    } 
});

router.post('/getOrders', async (req, res, next) => {
    try {
        let results = await db.getOrders();
        res.json(results);
    } catch (err) {
        res.sendStatus(500);
    }
});

router.post('/getItems', async (req, res, next) => {
    try {
        let results = await db.getItemList();
        res.json(results);
    } catch (err) {
        res.sendStatus(500);
    }
});

router.post('/getServices', async (req, res, next) => {
    try {
        let results = await db.getServices();
        res.json(results);
    } catch (err) {
        res.sendStatus(500);
    }
});

router.post('/updateOrder', async (req, res, next) => {
    try {
        let results = await db.updateOrderAsProcessing(req.body);
        let results2 = await db.insertOrderItems(req.body);
        let results3 = await db.insertItemCode(req.body);
        res.json(results);
    } catch (err) {
        res.sendStatus(500);
    }
});

router.post('/insertOrderItems', async (req, res, next) => {
    try {
        let results = await db.insertOrderItems(req.body);
        res.json(results);
    } catch (err) {
        res.sendStatus(500);
    }
});

router.post('/adminOrders', async (req, res, next) => {
    try {
        let results = await db.getAdminOrders();
        res.json(results);
    } catch (err) {
        res.sendStatus(500);
    }
});

router.post('/updateOrderForDeliver', async (req, res, next) => {
    try {
        let results = await db.updateOrderAsDelivery(req.body.orderid);
        res.json(results);
    } catch (err) {
        res.sendStatus(500);
    }
});

router.post('/updateDelivered', async (req, res, next) => {
    try {
        let results = await db.updateDelivered(req.body.orderid);
        res.json(results);
    } catch (err) {
        res.sendStatus(500);
    }
});

router.post('/adminOrdersHistory', async (req, res, next) => {
    try {
        let results = await db.getAdminOrdersHistory();
        res.json(results);
    } catch (err) {
        res.sendStatus(500);
    }
});

router.post('/getItemQuantity', async (req, res, next) => {
    try {
        let results = await db.getItemQuantity();
        res.json(results);
    } catch (err) {
        res.sendStatus(500);
    }
});

router.post('/getSales', async (req, res, next) => {
    try {
        let results = await db.getSales();
        res.json(results);
    } catch (err) {
        res.sendStatus(500);
    }
});

router.post('/orderConfirmed', async (req, res, next) => {
    try {
        let results = await db.onConfirmed(req.body.orderid);
        res.json(results);
    } catch (err) {
        res.sendStatus(500);
    }
});

router.post('/getOrderCodes', async (req, res, next) => {
    try {
        let results = await db.onGetOrderCodes(req.body.orderid);
        res.json(results);
    } catch (err) {
        res.sendStatus(500);
    }
});

router.post('/addService', async (req, res, next) => {
    try {
        let results = await db.onAddService(req.body);
        res.json(results);
    } catch (err) {
        res.sendStatus(500);
    }
});

router.post('/editService', async (req, res, next) => {
    try {
        let results = await db.editService(req.body);
        res.json(results);
    } catch (err) {
        res.sendStatus(500);
    }
});

router.post('/deleteService', async (req, res, next) => {
    try {
        let results = await db.deleteService(req.body);
        res.json(results);
    } catch (err) {
        res.sendStatus(500);
    }
});

module.exports = router;