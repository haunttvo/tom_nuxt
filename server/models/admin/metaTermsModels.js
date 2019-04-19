var mongoose = require('mongoose');
var Schema = mongoose.Schema({
    name: {type: String, required: true},
    slug : {type: String, required: true},
    ancestors : {type: Array},
    parent : { type: String, default : null },
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
        metaTerm.find({ termId: req.params.idterm }, function(err, result){
            if(err) return res.status(400).json(err);
            return res.status(200).json(result);
        });
    },
    deleteTerm : function(req, res){
        metaTerm.find({ancestors : req.params.idterm}).exec(function(err, result){
            if(err) console.log(err);
            if(result.length === 0){
                metaTerm.findOneAndDelete({_id : req.params.idterm}, function(er, rs){
                    return res.status(200).json({ type: 'success', rs : rs });
                });
            }else{
                return res.status(200).json( { type: 'error', rs : '' } );
            }
        });
    },
    gettermschildren : function(req, res){
        metaTerm.find({parentId : req.params.parentid}, function(err, result){
            if(err) console.log(err);
            return res.status(200).send(result);
        });
    }
};

module.exports = {metaTerm, fnMetaTerms};