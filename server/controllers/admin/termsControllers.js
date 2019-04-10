var termsModels = require('../../models/admin/termsModels');

module.exports = function(router){
    router.post('/addnew', (req, res) => {
        return termsModels.fnterms.addnew(req, res);
    });
    router.get('/findterms/:cpt', (req, res) => {
        return termsModels.fnterms.getTerms(req, res);
    });
}