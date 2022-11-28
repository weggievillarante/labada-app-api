const express = require('express');
const db = require('../db');

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        let results = await db.bookPickUp(req.body);
        res.json(results);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

module.exports = router;