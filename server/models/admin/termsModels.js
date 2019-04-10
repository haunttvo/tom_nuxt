var mongoose = require('mongoose');

var Schema = mongoose.Schema({
    name : { type: String, required: true },
    slug : { type: String, required: true },
    postType: {type: String, required: true},
    date_created : {type: Date, default : Date.now}
});

var terms = mongoose.model('terms', Schema);

var fnterms = {
    getTerms : function(req, res){
        terms.find({'postType' : req.params.cpt}, function(err, result){
            if(err) return res.status(404).json(err);
            return res.status(200).json(result);
        });
    },
    addnew : function(req, res){
        terms.create(req.body.arg, function(err, result){
            if(err) return res.status(404).json(err);
            return res.status(200).json(result);
        })
    }
}

module.exports = {terms, fnterms};