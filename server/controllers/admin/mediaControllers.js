var fs = require('fs');
var path = require('path');
module.exports = function(router){
    router.get('/rootfolder', (req, res) => {
        var results = [];
        var b = walk('./static/upload/');
        // b.then((rs) => {
        //     console.log(rs);
        // })
        res.status(200).json('ok');
    });
}

async function walk(directoryName){
    var results = [];
    var a = await fs.readdir(directoryName, function(e, files) {
        files.forEach(function(file) {
            fs.stat(directoryName + path.sep + file, function(e, f) {
                if (f.isDirectory()) {
                    results.push(file);
                    walk(directoryName + path.sep + file);
                } else {
                    // console.log(' - ' + file)
                }
            });

        });
    });
}