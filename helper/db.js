const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://movieapp:sanane123@ds215093.mlab.com:15093/movie-app-db',{ useNewUrlParser: true });
    mongoose.connection.on('open',()=>{
        console.log('MONGODB : Bağlantı kuruldu');
    });
    mongoose.connection.on('error',(err)=>{
        console.log('MONGODB : BAĞLANTI HATASI',err);
    });
};