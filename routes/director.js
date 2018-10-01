const express = require('express');
const router = express.Router();
const Directors=require('../models/Director');

router.post('/', (req, res, next)=> {
    // 1. yol bu
    /* const {name,surname,bio}=req.body;
    Director=new Directors({
        name:name,
        surname: surname,
        bio:bio,
    });
    Director.save((err,data)=>{
        if (err)
            res.json (err);
        res.json(data);
    });
    */
    //ikinci yol
    const director=new Directors(req.body);
    const promise=director.save();
    promise.then((data)=>{
        res.json(data);
    }).catch((err)=>{
        res.json(err);
    });

});

module.exports = router;
