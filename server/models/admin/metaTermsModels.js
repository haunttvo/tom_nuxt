var mongoose = require('mongoose');

var Schema = mongoose.Schema({
    name: {type: String, required: true},
    slug : {type: String, required: true},
    ancestors : {type: Array},
    parent : { type: String, default : null },
    description : String,
    termId : { type: String, required: true },
    date_created : { type : Date, default: Date.now }
});

var metaTerm = mongoose.model('metaterms', Schema);

var fnMetaTerms = {
    addnew : function(req, res){
        metaTerm.create(req.body.arg, function(err, result){
            if(err) return res.status(400).json(err);
            return res.status(200).json(result);
        });
    },
    getterms : async function (req, res) {
        metaTerm.find({ parent : null, termId: req.params.idterm }, function(err, result){
            var termsData = result.map((el) => {
                return Object.assign({children : []}, el._doc);
            });
            var pd = termsData.length;
            termsData.forEach((ele) => {
                metaTerm.find( { ancestors : String(ele._id) }).exec(function(er, rs){
                    ele.children = rs;
                    if (!--pd)
                        return res.status(200).json(termsData);
                });
            });
        });
    },
    gettermschildren : function(req, res){
        metaTerm.find({parentId : req.params.parentid}, function(err, result){
            if(err) console.log(err);
            return res.status(200).send(result);
        });
    }
}

var getAscendants = function(id,root) {
    var rec = metaTerm.findOne({id: id});
    if(rec.hasOwnProperty("parents")){
        (rec["parents"]).forEach(function(parent) {
            root[parent] = {};
            getAscendants(parent,root[parent]);
        });
    }
};

module.exports = {metaTerm, fnMetaTerms};