var mongoose = require('mongoose');

var Schema = mongoose.Schema({
    name : { type: String, required: true },
    slug : { type: String, required: true },
    date_created : { type: Date, default: Date.now }
});

var cpt = mongoose.model('cpt', Schema);

var cptFn = {
    createCpt : function(req, res){
        var itemCpt = {
            name: req.body.name,
            slug: req.body.slug
        }
        cpt.create(itemCpt, function(err, result){
            if(err) return res.status(404).json(err);
            return res.status(200).json(result);
        });
    },
    getListCpt : function(req, res){
        cpt.find(function(err, result){
            if(err) return res.status(404).json(err);
            return res.status(200).json(result)
        });
    },
    getItemCpt : function(req, res){
        cpt.findById(req.params.idCpt, function(err, result){
            if(err) return res.status(404).json(err);
            return res.status(200).json(result);
        });
    },
    updateCpt : function(req, res){
        var args = {
            name : req.body.arg.name,
            slug : req.body.arg.slug,
        }
        cpt.findOneAndUpdate({_id : req.body.id}, args, function(err, result){
            if(err) return res.status(404).json(err);
            return res.status(200).json(result);
        });
    },
    deleteCpt : function(req, res){
        cpt.deleteOne({_id: req.params.id}, function(err, result){
            if(err) return res.status(404).json(err);
            return res.status(200).json(result);
        });
    }
}

module.exports = {cpt, cptFn}