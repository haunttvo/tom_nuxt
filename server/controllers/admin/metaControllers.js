var metaModels = require('../../models/admin/metaModels');

module.exports = function(router){
    router.post('/getmeta', function(req, res){
        return metaModels.fnMeta.getmeta(req, res);
    });
    router.post('/addnew', function(req, res){
        return metaModels.fnMeta.addNewMeta(req, res);
    });
    router.put('/update', function(req, res){
        return metaModels.fnMeta.updateMeta(req, res);
    });
}