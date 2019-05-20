var request = require("request");
var _ = require('lodash');
/* get accesstoken kioviet */

async function getaccesstoken(req){
    var options = { method: 'POST',
        url: 'https://id.kiotviet.vn/connect/token',
        headers:
            { 'cache-control': 'no-cache',
                Connection: 'keep-alive',
                'content-length': '131',
                'accept-encoding': 'gzip, deflate',
                Host: 'id.kiotviet.vn',
                'Postman-Token': 'd14cb26c-e46e-485a-b507-e231e5077007,ac6235a1-9d44-4b78-8441-a8e09d2a0a85',
                'Cache-Control': 'no-cache',
                Accept: '*/*',
                'User-Agent': 'PostmanRuntime/7.11.0',
                'Content-Type': 'application/x-www-form-urlencoded' },
        form:
            {
                client_id: 'fefe0f2f-b817-41ca-9c7b-894af95ba468',
                client_secret: '7B14D044ECB95369E11241D1172AAA7125B7532E',
                grant_type: 'client_credentials'
            }
    };
    if(req.session.accesstokenkioviet){
        return req.session.accesstokenkioviet;
    }else{
        return new Promise(function(resolve, reject){
            request(options, function (error, response, body) {
                if(!error && response.statusCode == 200 ){
                    req.session.accesstokenkioviet = JSON.parse(body);
                    resolve(JSON.parse(body));
                }else{
                    reject(error);
                }
            });
        });
    }


}


module.exports = function(router){
    router.get('/getproducts', function(req, res){
        getaccesstoken(req).then(response => {
            var options = {
                method: 'get',
                url : 'https://public.kiotapi.com/products?pageSize=100&orderBy=id&lastModifiedFrom=2018-01-01&orderDirection=desc',
                headers : {
                    Retailer : 'namanstore',
                    Authorization : `Bearer ${response.access_token}`
                }
            };
            request(options, function(err, response, data){
                let arrdata = JSON.parse(data);
                return res.status(200).json( _.groupBy(arrdata.data,'masterProductId'));
            })
            // req.session.accesstokenkioviet = res.access_token;
        });
    });
}