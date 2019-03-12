const postsModels = require('../../models/admin/postsModels');

module.exports = function(router){
    router.get('/listpostcpt/:cpt', function(req, res){
        return postsModels.fnPosts.listpostcpt(req, res);
    });
    router.get('/detailpost/:id', function(req, res){
        return postsModels.fnPosts.detailpost(req, res);
    });
    router.post('/addnew', function(req, res){
        return postsModels.fnPosts.addnewPosts(req, res);
    });
    router.put('/updatePost', function(req, res){
        return postsModels.fnPosts.updatePost(req, res);
    });
}