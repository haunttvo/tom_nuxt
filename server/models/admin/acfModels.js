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
    }
}

module.exports = {acf, acfFn}