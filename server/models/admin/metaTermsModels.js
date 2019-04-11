var mongoose = require('mongoose');

var Schema = mongoose.Schema({
    name: {type: String, required: true},
    slug : {type: String, required: true},
    parentId : { type: String },
    description : String,
    termId : { type: String, required: true },
    date_created : { type : Date, default: Date.now }
});

var metaTerm = mongoose.model('metaterms', Schema);

var fnMetaTerms = {
    addnew : function(req, res){
        metaTerm.create(req.body.arg, function(err, result){
            if(err) return res.status(400).json(err);
            return res.status(200).json(result);
        });
    },
    getterms : async function (req, res) {
        metaTerm.find({ termId : req.params.idterm, parentId : '0' }, function(err, result){
            if(err) return res.status(400).json(err);
            var dataTerms = result.map(function(e, index, terms){
                // console.log(e);
                // return e.asdasd = [123213213123];
                // childTerms(e, function(err, rs){
                //     if(rs){
                //         return Object.assign({children:rs}, e._doc);
                //     }else{
                //         return Object.assign({children:[]}, e._doc);
                //     }
                //     // console.log(rs.children);
                    
                    
                // });
                // return childTerms
                return childTerms(e, function(err, rs){
                    return rs;
                })
                
                // return Object.assign({children:[]}, e._doc);
                // console.log(xx);
                
                
            });
            // console.log(dataTerms);
            return res.status(200).json(dataTerms);
        })    
    }
}

var childTerms = function(data, done){
    // var results = [];
    metaTerm.find({parentId : data._id}, function(err, rs){
        if(err)
            return done(err);
        var pending = rs.length;
        if(!pending)
            return done(null, results);
        var results = rs.map(function(e){
            return childTerms(e, function(err, res){
                return Object.assign({children:res}, e._doc);
            });
            // return Object.assign({children:rs}, e._doc);
        });
        return done(null, results);
    });
}
module.exports = {metaTerm, fnMetaTerms};