var jwt = require('jsonwebtoken');
module.exports = {
    verifyToken : function(req, res, next){
        const bearerHeader = req.headers['authorization'];
        if(typeof bearerHeader !== 'undefined'){
            const bearer = bearerHeader.split(' ');
            // get token
            const bearerToken = bearer[1];
            req.token = bearerToken;
            next();
        }else{
            res.sendStatus(403);
        }
    },
    confirmTokened : function(req, res, next){
        console.log(req.token);
        next();
    }
}