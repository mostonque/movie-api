const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../app');

chai.use(chaiHttp);

let token;

describe('/api/movies tests', () => {
    before((done) => {
        chai.request(server)
            .post('/authenticate')
            .send({username: 'serhat', password: '12345'})
            .end((err, res) => {
                token = res.body.token;
                //console.log(token),
                done();
            });
    });

    describe('/GET movies', () => {
        it('tüm filmleri listelemeli', (done) => {
            chai.request(server)
                .get('/api/movies')
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });
    describe('/POST movie', () => {
        it('film ekleme', (done) => {
            const movie={
                title:'serhat',
                directorId: '5bbb27e97bf48b455cca743c',
                category: 'Horror',
                country:'Türkiye',
                year:1952,
                imdb_score:9.4
            };

            chai.request(server)
                .post('/api/movies')
                .send(movie)
                .set('x-access-token',token)
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('directorId');
                    res.body.should.have.property('category');
                    res.body.should.have.property('country');
                    res.body.should.have.property('year');
                    res.body.should.have.property('imdb_score');
                    done();
                });
        });
    });
});