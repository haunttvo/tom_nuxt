var mongoose = require('mongoose');

var Schema = mongoose.Schema({
    field : { type : Object, required : true },
    date_created : { type: Date, default: Date.now }
});

var acf = mongoose.model('acf', Schema);

var acfFn = {
    getListAcf : function(req, res){
        acf.find(function(err, result){
            if(err) return res.status(400).json(err);
            return res.status(200).json(result);
        });
    },
    updateItemAcf : function(req, res){
        acf.findOneAndUpdate({_id : req.body.id}, { field:  req.body.args }, function(err, result){
            if(err) return res.status(400).json(err);
            return res.status(200).json(result);
        })
    },
    updatePosition : function(req, res){
        acf.update( {_id : req.body._id}, { $set : { "field.position" : req.body.position, "field.order" : req.body.idex } }  , function(err, result){
            if(err) return res.status(400).json(err);
            return res.status(200).json(result);
        });
    },
    getAcfItem : function(req, res){
        acf.findById(req.params.id, function(err, result){
            if(err) return res.status(400).json(err);
            return res.status(200).json(result);
        });
    },
    createAcf : function(req, res){
        acf.create({field : req.body.field}, function(err, result){
            if(err) return res.status(400).json(err);
            return res.status(200).json(result);
        });
    },
    getAcfCpt(req, res){
        acf.find( {$and : [ { 'field.formLocation.optionPostType' : req.params.cpt}, { 'field.position' : req.params.position } ]} ,function(err, result){
            if(err) return res.status(400).json(err);
            return res.status(200).json(result);
        }).sort( { 'field.order' : 1 } );
    }
}

module.exports = {acf, acfFn}