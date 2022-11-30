const express = require('express');
const db = require('../db');

const router = express.Router();

//Customer Routes
router.post('/booking', async (req, res, next) => {
    try {
        let results = await db.bookPickUp(req.body);
        res.json(results);
    } catch (err) {
        console.log(err);
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
        console.log(err);
        res.sendStatus(500);
    }
}); 

module.exports = router;