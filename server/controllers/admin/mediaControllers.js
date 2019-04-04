var fs = require('fs');
var path = require('path');
var formidable = require('formidable');
module.exports = function(router){
    router.get('/rootfolder', (req, res) => {
        diretoryTreeToObj('./static/upload', function(err, result){
            if(err)
                console.error(err);
                res.status(200).json(result);
        });
        
    });
    router.post('/listImageReq', function(req, res){
        fs.readdir(req.body.urlImage, function (err, files) {
            //handling error
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            } 
            var arr = [];
            files.forEach(element => {
                arr.push({
                    name : element,
                    type : path.extname(element) ? path.extname(element) : 'folder',
                    dir :  req.body.urlImage.split('upload')[1].replace('//', '/') + '/' + element
                });
            });
            //listing all files using forEach
            return res.status(200).json(arr);
        });
    });
    router.post('/uploadFile', (req, res) => {
        var form = new formidable.IncomingForm();
        form.parse(req);
        form.on('field', function(name, field){
            var dir = field;
            form.on('file', function(name, file){
                fs.readFile(file.path, function(err, data){
                    var image_name = file.name;
                    if(!image_name){
                        res.sendStatus(404);
                    }else{
                        var newpath = dir + '/' + image_name;
                        fs.writeFile(newpath, data, function(err){
                            if(err){
                                console.log(err);
                                res.sendStatus(404);
                            }
                            return res.status(200).json('ok');
                        });
                    }
                });
            });   
        });
    });
    router.delete('/removeArrImageDir', (req, res) => {
        arrImageDir = req.body.arrImage;
        arrImageDir.forEach((el) => {
            _deleFile(el);
        });
        res.status(200).send('file deleted successfully');
    });
}

function _deleFile(url){
    fs.stat(`./static/upload/${url}`, function (err, stats) {
        if (err) {
            return console.error(err);
        }
        fs.unlink(`./static/upload/${url}`,function(err){
            if(err) return console.log(err);
            // console.log('file deleted successfully');
        });
    });
}

var diretoryTreeToObj = function(dir, done) {
    var results = [];
    fs.readdir(dir, function(err, list) {
        if (err)
            return done(err);

        var pending = list.length;
        if (!pending)
            return done(null, {name: path.basename(dir), url : dir, type: 'folder', children: results});
        list.forEach(function(file) {
            file = path.resolve(dir, file);
            fs.stat(file, function(err, stat) {
                if (stat && stat.isDirectory()) {
                    diretoryTreeToObj(file, function(err, res) {
                        results.push({
                            name: path.basename(file),
                            url : file,
                            type: 'folder',
                            children: res
                        });
                        if (!--pending)
                            done(null, results);
                    });
                }
                else {
                    if (!--pending)
                        done(null, results);
                }
            });
        });
    });
};