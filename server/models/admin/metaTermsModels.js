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
        
        var rsTermsArr = [];
        metaTerm.find({ parentId : 0 },function(err, result){
            if(err) console.log(err);
            var frChildTerm = new Promise((resolve, reject) => {
                result.forEach((el) => {
                    var itemChild = {
                        _id : el._id,
                        name: el.name,
                        slug: el.slug,
                        parentId : el.parentId,
                        description : el.description,
                        termId : el.termId,
                        date_created : el.date_created,
                        children : []
                    }
                    var indexItem = rsTermsArr.push(itemChild);
                });
                resolve(rsTermsArr);
            });
            Promise.all([frChildTerm]).then((rs) => {
                console.log(rs);
            })
            // console.log(rsTermsArr);

        });
        
        


        return res.status(200).json(123123123);

        

        
    }
}

var childTerms = function(data, done){
    // var results = [];
    metaTerm.find({parentId : data._id}, function(err, rs){
        if(err)
            return done(err);
        var pending = rs.length;
        if(!pending)
            return done(null, results);
        var results = rs.map(function(e){
            childTerms(e, function(err, res){
                // return Object.assign({children:res}, e._doc);
            });
            return Object.assign({children:rs}, e._doc);
        });
        return done(null, results);
    });
}
module.exports = {metaTerm, fnMetaTerms};