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
        var pushAncesstors = function (name, doc) {
            if(doc.parentId) {
                metaTerm.update({name : name}, {$addToSet : {"ancesstors" : {name : doc.parentId}}});
                pushAncesstors(name, db.collection.findOne({name : doc.parentId}))
            }
        }
        metaTerm.find( { termId : req.params.idterm }).forEach(function (doc){
            pushAncesstors(doc.parentId, doc);
        });
        return res.status(200).json(123123123);

        

        
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
            childTerms(e, function(err, res){
                // return Object.assign({children:res}, e._doc);
            });
            return Object.assign({children:rs}, e._doc);
        });
        return done(null, results);
    });
}
module.exports = {metaTerm, fnMetaTerms};