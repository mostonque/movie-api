const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
//MODEL
const User = require('../models/User');

//JWT
const jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', {title: 'Express'});
});

router.post('/reqister', (req, res, next) => {
    const {username, password} = req.body;

    bcrypt.hash(password, 10).then((hash) => {
        const user = new User({
            username,
            password: hash
        });
        const promise = user.save();
        promise.then((data) => {
            res.json(data);
        }).catch((err) => {
            res.json(err);
        });
    });
});

router.post('/authenticate', (req, res) => {
    const {username, password} = req.body;
    User.findOne({
        username
    }, (err, user) => {
        if (err)
            throw err;

        if (!user) {
            res.json({
                status: false,
                message: 'authentication failed. User not found.'
            });
        } else {
            bcrypt.compare(password, user.password).then((result) => {
                if (!result) {
                    res.json({
                        status: false,
                        message: 'authentication failed.Wrong password.'
                    });
                } else {
                    const payload = {
                        username, //username=username demek bu. es6 ile gelen bir özellikle böyle tek yazabiliyoruz
                    };
                    // 1. parametreye payloadı, 2. ye secret keyi , 3.ye de geçerli olacağı saati veriyoruz

                    const token=jwt.sign(payload,req.app.get('api_secret_key'),{
                        expiresIn: 720//dk cinsinden bir ifadedir. 12 saate tekabül eder.
                    });
                    res.json({
                        status:true,
                        token
                    });
                }
            })
        }

    });

});


module.exports = router;
