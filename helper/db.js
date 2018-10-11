const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://serhat:sanane123@ds223063.mlab.com:23063/movie-app',{ useNewUrlParser: true });
    mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false);
    mongoose.connection.on('open',()=>{
        console.log('MONGODB : Bağlantı kuruldu');
    });
    mongoose.connection.on('error',(err)=>{
        console.log('MONGODB : BAĞLANTI HATASI',err);
    });
};