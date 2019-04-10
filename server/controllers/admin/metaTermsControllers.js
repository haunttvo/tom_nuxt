var metaTermsModel = require('../../models/admin/metaTermsModels');

module.exports = function(router){
    router.post('/addnew', function(req, res){
        return metaTermsModel.fnMetaTerms.addnew(req, res);
    })
}