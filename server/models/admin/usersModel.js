var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username:{
        type: String,
        trim: true,
        required: true,
        unique : true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    date_created : { type: Date, default: Date.now }
});
UserSchema.pre("save", function(next) {
    const user = this;
    bcrypt.hash(user.password, 10, function(err, hash){
        if(err) return next(err)
        user.password = hash;
        next();
    });
});

var users = mongoose.model('users', UserSchema);
var usersFn = {
    addnew: function(req, res){
        var arg = {
            username : req.body.arg.username,
            email : req.body.arg.email,
            firstname : req.body.arg.firstname,
            lastname : req.body.arg.lastname,
            password: req.body.arg.password,
        }
        var InsertUser = new users(arg);
        InsertUser.save(arg, (err, result) => {
            if(err) return res.sendStatus(500)
            return res.status(200).json(result)
        });        
    },
    checklogin : function(req, res, useritem){
        users.findOne( { $or : [ {username : useritem.usernameoremail}, {email : useritem.usernameoremail} ] }).exec(function(err, resuser){
            console.log(resuser);
            if(err){
                // console.log(err);
                return res.status(403).send('error');
            }else{
                return res.status(200).json('ok');
                // bcrypt.compare(useritem.password,resuser.password,function(err, result){
                //     if(result == true){
                //         jwt.sign({useritem}, 'scretkeylogin', (error, token) => {
                //             if(error) return res.status(403).send('error');
                //             return res.status(200).json({
                //                 token : token
                //             });
                //         });
                        
                //     }else{
                //         return res.status(403).send('error');
                //     }
                // });
            }
        });
    }
}

module.exports = {users, usersFn};