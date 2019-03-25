var jwt = require('jsonwebtoken');
var usersModel = require('../../models/admin/usersModel');
module.exports = function(router){
    router.post('/addnew', function(req, res){
        return usersModel.usersFn.addnew(req, res);
        // jwt.verify(req.token, 'secretkey', (err, authData) => {
        //     if(err){
        //         res.sendStatus(403);
        //     }else{
        //         return res.json({
        //             message : 'posts created',
        //             authData
        //         });
        //     }
        // });
    });

    router.post('/login', (req, res) => {
        const user = {
            id : 1,
            username: 'hau'
        }
        jwt.sign({user},'secretkey',{ expiresIn : '30s' }, (err, token) => {
            return res.json({
                token: token
            });
        });
    });
}
// format token
// authorization : bearer <access_token>

// verify token
function verifyToken(req, res, next){
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
}
