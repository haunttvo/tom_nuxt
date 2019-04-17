var mongoose = require('mongoose');

var Schema = mongoose.Schema({
    name: {type: String, required: true},
    slug : {type: String, required: true},
    parentId : { type: String },
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
        metaTerm.find({ parentId : 0, termId : req.params.idterm }).exec((err, result) => {
            if(err) console.log(err);
            var dataTerms = result.map(function(e, index, terms){
                return Object.assign({children : []}, e._doc);

            });
            dataTerms.forEach((el, index) => {
                childTerms(el, function(err, rs){
                    el.children = rs;
                    if(index >= 1){
                        return res.status(200).json(dataTerms);
                    }
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

var childTerms = function(data, done){
    metaTerm.find({parentId : data._id}, function(err, rs){
        if(err)
            return done(err);
        var pending = rs.length;
        if(!pending)
            return done(null, rs);
        var results = rs.map(function(e){
            return Object.assign({children : []}, e._doc);
        });
        results.forEach((el) => {
            // childTerms();
        });
        return done(null, results);
    });
};

module.exports = {metaTerm, fnMetaTerms};