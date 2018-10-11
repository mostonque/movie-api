const jwt= require('jsonwebtoken');

module.exports=(req,res,next)=>{    //body post metodunda olur
            //query get metodunda olur.örnek olarak localhost:3000/api/movies?token= burdan sonra
            // token eklenirse get metodundan onu çeker query.
    const token=req.headers['x-access-token'] || req.body.token || req.query.token;
    
    if (token){
        jwt.verify(token,req.app.get('api_secret_key'),(err,decoded)=>{
            if (err){
                res.json({
                    status:false,
                    message:'Failed to authenticate token'
                })
            }else{
                //herşey yolundaysa requeste decode edilmiş datayı koymak gerekiyor.belirlediğimiz alan
                // olan payload ı burda alacağız.
                req.decode=decoded;
                next();// next deme sebebimiz de herşey yolunda herhangi bir route la eşleşebilirsin demek
            }
        });
    } else {
        res.json({
            status:false,
            message:'No token provided'
        });

    }
};