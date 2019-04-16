var metaTermsModel = require('../../models/admin/metaTermsModels');

module.exports = function(router){
    router.post('/addnew', function(req, res){
        return metaTermsModel.fnMetaTerms.addnew(req, res);
    });
    router.get('/getterms/:idterm', function(req, res){
        return metaTermsModel.fnMetaTerms.getterms(req, res);
    });
    router.get('/termchildren/:parentid', function(req, res){
        return metaTermsModel.fnMetaTerms.gettermschildren(req, res);
    });
}