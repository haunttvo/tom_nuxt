var jwt = require('jsonwebtoken');
var usersModel = require('../../models/admin/usersModel');
var bcrypt = require('bcrypt');
module.exports = function(router){
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