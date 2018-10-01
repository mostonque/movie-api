const express = require('express');
const router = express.Router();

const Movie = require('../models/Movie.js');

router.post('/', (req, res, next) => {
    // const data=req.body;
    //res.json(data.title);
    //destructing yapısıyla veri gönderme

    const {title, category, country, year, imdb_score} = req.body;
    const movie = new Movie({
        title: title,
        category: category,
        country: country,
        year: year,
        imdb_score: imdb_score
    });
    movie.save((err, data) => {
        if (err)
            throw err;
        res.json(data);
    });
});
// top10 listesi
router.get('/top10', (req, res) => {//imdb_score u büyükten küçüğe sıralama -1
    const top10 = Movie.find({}).limit(10).sort({imdb_score: -1});

    top10.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});
    router.get('/filmgetir', (req, res) => {
        Movie.find({}, (err, data) => {
            if (err)
                throw err;
            res.json({status: 1});
        });
    });

    router.get('/:movie_id', (req, res, next) => {
        Movie.findById(req.params.movie_id, (err, data) => {
            if (!data)
                next({message: 'film bulunamadı!'});
            res.json(data);
        }).catch((err) => {
            res.json(err);
        });
    });

    router.put('/:id', (req, res, next) => {
        Movie.findByIdAndUpdate(req.params.movie_id, req.body,
            (err, data) => {
                if (!data)
                    next({message: 'film bulunamadı loooo!'});

                res.json(data);
            }).catch((err) => {
            res.json(err);
        });
    });
    router.delete('/:delete', (req, res, next) => {
        Movie.findByIdAndRemove(req.params.delete, req.body,
            (err, data) => {
                if (!data)
                    next({message: 'SİLİNECEK FİLM BULUNAMADI'});

                res.json(data);
            }).catch((err) => {
            res.json(err);
        });

    });
    //BETWEEN iki yıl arasında olan filmleri getiren end point!
    router.get('/between/:start_year/:end_year',(req,res)=>{
        const {start_year,end_year}=req.params;
       const promise= Movie.find(
            {       //req parametresinden dönen veri string olduğu
                    // için onu integer a döndürmemz gerek
                    // bu yüzden parseInt kullanıyoruz
                year:{"$gte":parseInt(start_year),"$lte":parseInt(end_year)}
            }
            );

       promise.then((data)=>{
           res.json(data);
       }).catch((err)=>{
           res.json(err);
       });
    });


    module.exports = router;
