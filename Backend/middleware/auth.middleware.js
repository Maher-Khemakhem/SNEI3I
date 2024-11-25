const jwt = require('jsonwebtoken');

const requireAuth = (req,res,next)=>{
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token,process.env.JWT_SECRET || 'maher secret',(err,decodedToken)=>{
            if(err){
                console.log(err.message);
                res.status(400).json({ data:'You have to login' });
            }else{
                console.log(decodedToken);
                next();
            }
        })
    }else{
        res.status(403).json({ data:'You have to login' });
    }
}
module.exports = {requireAuth};