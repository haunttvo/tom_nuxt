var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema({
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
    // passwordConf: {
    //     type: String,
    //     required: true,
    // }
});

var users = mongoose.model('users', Schema);
Schema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, 10, function (err, hash){
      if (err) {
        // return next(err);
      }
      user.password = hash;
    //   next();
    })
});
var usersFn = {
    addnew: function(req, res){
        var arg = {
            username : req.body.arg.username,
            email : req.body.arg.email,
            firstname : req.body.arg.firstname,
            lastname : req.body.arg.lastname,
            password: req.body.arg.password,
            // passwordConf: req.body.arg.passwordConf,
        }
        users.create(arg, (err, result) => {
            if(err) return res.sendStatus(500)
            return res.status(200).json(result)
        });        
    }
}

module.exports = {users, usersFn};