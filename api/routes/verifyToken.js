const jwt = require("jsonwebtoken");

const verifyToken = (req,res,next) => {
    const authHeader = req.headers.token;
    if(authHeader){
        // console.log(authHeader)
        const token = authHeader.split(" ")[1];
        jwt.verify(token,process.env.JWT_SEC,(err,user)=>{
            if(err) res.status(401).json("Invalid Token");
            req.user = user;
            next();
        })
    }else{
        return res.status(401).json("You are not authenticated")
    }
};

const verifytokenAndAuthorization = (req,res,next) =>{
    verifyToken(req,res, ()=>{
        // console.log(req.user.id)
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else{
            res.status(403).json("You are not allowed to perform this activity!")
        }
    })
}

const verifytokenAndAdmin = (req,res,next) =>{
    verifyToken(req,res, ()=>{
        // console.log(req.user)
        if(req.user.isAdmin){
            next()
        }else{
            res.status(403).json("Only Admin is allowed to perform this activity!")
        }
    })
}

module.exports = {
    verifyToken, 
    verifytokenAndAuthorization,
    verifytokenAndAdmin,
};