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
        metaTerm.find({ parentId : 0, termId : req.params.idterm },function(err, result){
            return res.status(200).json(result);
        });   
    },
    gettermschildren : function(req, res){
        metaTerm.find({parentId : req.params.parentid}, function(err, result){
            if(err) console.log(err);
            return res.status(200).send(result);
        });
    }
}
module.exports = {metaTerm, fnMetaTerms};