var mongoose = require('mongoose');

var Schema = mongoose.Schema({
    context : Object,
    date_created : {type: Date, default : Date.now}
});

var posts = mongoose.model('posts', Schema);

var fnPosts = {
    addnewPosts : function(req, res){
        var args = {
            context : req.body.arg
        };
        posts.create(args, function(err, result){
            if(err) return res.status(400).json(err);
            return res.status(200).json(result);
        });
    },
    listpostcpt: function(req, res){
        posts.find({ 'context.posttype' : req.params.cpt },function(err, result){
            if(err) return res.status(400).json(err);
            return res.status(200).json(result);
        });
    },
    detailpost: function(req, res){
        posts.findById(req.params.id,function(err, result){
            if(err) return res.status(400).json(err);
            return res.status(200).json(result);
        });
    },
    updatePost(req, res){
        var args = {
            context : req.body.arg
        };
        posts.findOneAndUpdate( {_id: req.body.id}, args, {upsert: true}, function(err, result){
            if(err) return res.status(400).json(err);
            return res.status(200).json(result);
        });
    },
    deletePost(req, res){

    }
}

module.exports = {posts, fnPosts}