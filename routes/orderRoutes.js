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

module.exports = router;