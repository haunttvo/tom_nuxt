var jwt = require('jsonwebtoken');
var usersModel = require('../../models/admin/usersModel');
var axios = require('axios');
var bcrypt = require('bcrypt');
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
    router.get('/abc', (req, res) => {
        res.send('ok');
    });
    router.post('/login', (req, res) => {
        var userItem = {
            usernameoremail : req.body.formlogin.usernameoremail,
            password : req.body.formlogin.password
        }
        usersModel.usersFn.checklogin(userItem).then((ts) => {
            if(ts != null){
                bcrypt.compare(userItem.password, ts.password, function(err, result){
                    if(result == true){
                        jwt.sign({userItem}, 'scretkeylogin',(error, token) => {
                            if(error) return res.sendStatus(403);
                            axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 
                            return res.status(200).json({
                                token: token
                            })
                        });
                    }else{
                        return res.sendStatus(403);
                    }
                });
            }else{
                return res.sendStatus(403);
            }
        });
    });
}
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
