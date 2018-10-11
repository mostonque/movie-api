const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../app');

chai.use(chaiHttp);

let token, MovieId;

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
        it('film eklemeli', (done) => {
            const movie = {
                title: 'FİLMİM123',
                directorId: '5bbf3215b740660a78bd0467',
                category: 'Korku',
                country: 'SPAİN',
                year:1945,
                imdb_score: 6.2
            };
            chai.request(server)
                .post('/api/movies')
                .send(movie)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('directorId');
                    res.body.should.have.property('category');
                    res.body.should.have.property('country');
                    res.body.should.have.property('year');
                    res.body.should.have.property('imdb_score');
                    MovieId = res.body._id;
                    done();
                });
        });
    });
    describe('/GET/:directorId movie',()=>{
        it('director id ile movie getirmeli', (done)=> {
            chai.request(server)
                .get('/api/movies/'+ MovieId)
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
                    res.body.should.have.property('_id').eql(MovieId);
                    done();
                });
        });
    });

});