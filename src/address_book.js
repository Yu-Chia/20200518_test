const express = require('express');

const db = require(__dirname+'/db_connect2');

const router = express.Router();

router.get('/list',(req, res)=>{
    db.query("SELECT * FROM `address_book` WHERE 1")
    .then(([results])=>{
        res.render('address_book/address-book',{results});
        // res.json(results);
    });
    // res.send('ok');
})
module.exports = router;