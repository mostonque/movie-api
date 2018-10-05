const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// Models
const Director = require('../models/Director');

router.post('/', (req, res, next) => {
    const director = new Director(req.body);
    const promise = director.save();

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    })
});

router.get('/', (req, res) => {
    const promise = Director.aggregate([
        {
            $lookup: {
                from: 'movies',
                localField: '_id',
                foreignField: 'directorId',
                as: 'movies'
            }
        },
        {
            $unwind:{
                path:"$movies",
                preserveNullAndEmptyArrays:true
            }
        },
        {
            $group: {
                _id:{
                    _id:'$_id',
                    name:'$name',
                    surname:'$surname',
                    bio: '$bio'
                },
                movies:{
                    $push:'$movies'
                }
            }
        },
        {
            $project:{
                _id:'$_id._id',
                name: '$_id.name',
                surname:'$_id.surname',
                movies: '$movies'
            }
        }

    ]);

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

router.get('/:director_id', (req, res) => {
    const promise = Director.aggregate([
        {
            $match: {
                //böyle yazınca boş array döner. çünkü '_id' değişkeni ObjectId tipinde
                //bir veri olduğu için önce mongoose u sayfamıza dahil etmemiz gerekiyor.
                // ekledikten sonra mongoose.Types.ObjectId metodunu ekememiz gerekiyor aşağıdaki gibi
                // mongoose.Types daki mongoose yazısı, yukarda mongoose a verdiğimiz değişken adını alır.
                '_id':mongoose.Types.ObjectId(req.params.director_id)
            }
        },
        {
            $lookup: {
                from: 'movies',
                localField: '_id',
                foreignField: 'directorId',
                as: 'movies'
            }
        },
        {
            $unwind:{
                path:"$movies",
                preserveNullAndEmptyArrays:true
            }
        },
        {
            $group: {
                _id:{
                    _id:'$_id',
                    name:'$name',
                    surname:'$surname',
                    bio: '$bio'
                },
                movies:{
                    $push:'$movies'
                }
            }
        },
        {
            $project:{
                _id:'$_id._id',
                name: '$_id.name',
                surname:'$_id.surname',
                movies: '$movies'
            }
        }

    ]);

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});


module.exports = router;