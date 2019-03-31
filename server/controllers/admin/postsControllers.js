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
    router.delete('/deletePost/:id', function(req, res) {
        return postsModels.fnPosts.deletePost(req, res);
    });
}

function verifyToken(req, res, next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        // get token
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }else{
        res.sendStatus(403);
    }
}