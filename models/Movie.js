const mongoose=require('mongoose');
const Schema= mongoose.Schema;

const MovieSchema = new Schema({
    director_id: Schema.Types.ObjectId,
    title:{
        type:String,
        required:true,
    },
    category:String,
    country:String,
    year:Number,
    imdb_score:Number,
    createdAt:{
        type:Date,
        default:Date.now,
    },


});     //BURDAKİ VİDEOLAR ADLI ALAN veri tbanı kayıt şema adı
module.exports=mongoose.model('videolar',MovieSchema);