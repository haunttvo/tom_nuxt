var mongoose = require('mongoose');

var Schema = mongoose.Schema({
    key : String,
    value : String,
    postid : { type : String, require },
    date_created : { type : Date, default: Date.now }
});

var meta = mongoose.model('meta', Schema);

var fnMeta = {
    addNewMeta : function(req, res){
        var args = {
            key : req.body.arg.key,
            value : req.body.arg.value,
            postid : req.body.arg.postid
        }
        meta.create(args, function(err, result){
            if(err) return res.status(400).json(err);
            return res.status(200).json(result);
        });
    },
    getmeta: function(req, res){
        meta.find( { postid : req.body.arg.id, key : req.body.arg.key } , function(err, result){
            if(err) return res.status(400).json(err);
            return res.status(200).json(result);
        });
    }
}

module.exports = { meta, fnMeta };