const cptModels = require('../../models/admin/cptModels');

module.exports = function(router){
    router.get('/', function(req, res){
        return cptModels.cptFn.getListCpt(req, res);
    });
    router.get('/getCpt/:idCpt', function(req, res){
        return cptModels.cptFn.getItemCpt(req,res);
    });
    router.post('/addnew', function(req, res){
        return cptModels.cptFn.createCpt(req, res);
    });
}