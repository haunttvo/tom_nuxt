const acfModels = require('../../models/admin/acfModels');

module.exports = function(router){
    router.get('/getListAcf', function(req, res){
        return acfModels.acfFn.getListAcf(req, res);
    });
    router.get('/getAcfItem/:id', function(req, res){
        return acfModels.acfFn.getAcfItem(req, res);
    });
    router.put('/updateacf', function(req, res){
        return acfModels.acfFn.updateItemAcf(req, res);
    });
    router.post('/addnewacf', function(req, res){
        return acfModels.acfFn.createAcf(req, res);
    });

    router.get('/getAcfPost/:cpt/:position', function(req, res){
        return acfModels.acfFn.getAcfCpt(req, res);
    });
}