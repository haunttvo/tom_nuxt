var jwt = require('jsonwebtoken');
module.exports = {
    verifyToken : function(req, res, next){
        const bearerHeader = req.headers['authorization'];
        if(typeof bearerHeader !== 'undefined'){
            const bearer = bearerHeader.split(' ');
            // get token
            const bearerToken = bearer[1];
            jwt.verify(bearerToken, 'scretkeylogin', function(err, authAdminData){
                if(typeof authAdminData !== 'undefined'){
                    next();
                }else{
                    return res.sendStatus(403);
                }
            });
        }else{
            res.sendStatus(403);
        }
    }
}