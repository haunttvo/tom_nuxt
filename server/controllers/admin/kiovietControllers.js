var request = require("request");
var _ = require('lodash');
var WooCommerceAPI = require('woocommerce-api');
var WooCommerce = new WooCommerceAPI({
    url: 'http://localhost/namanstore', // Your store URL
    consumerKey: 'ck_221095ddfea75373f8a3c7a7204d497ddf0384dc', // Your consumer key
    consumerSecret: 'cs_ceeadf781816534a82ec32c062e7b2c34b9c7ab4', // Your consumer secret
    wpAPI: true, // Enable the WP REST API integration
    version: 'wc/v3' // WooCommerce WP REST API version
});
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
async function insertpd(vl, key){
    if(key == 0){
        let dataproduct = {
            name : vl.name,
            type: 'variable',
        };
        await WooCommerce.post('products', dataproduct, function(err, data, rs){
            return JSON.parse(rs);
        });
    }
}
async function pushattr(data){
    let arrge = [];
    await req.body.data[key].forEach(function(vl, k){
        arrge.push(vl.attributes);
    });
}
async function pushattr(data){
    var arrattr = [];
    await Object.keys(data).forEach(function(item, key){
        data[item].forEach(function(b){
            b.attributes.forEach(function(i){
                arrattr.push(i);
            });
        });
    });
    return arrattr;
}
async function createproduct(data){
    var id = [];
    const prs = Object.keys(data);

        for (const pr of prs) {
            for (const a of data[pr]){
                var datapr = {
                    name: a.name,
                    type: 'variable',
                };
                return new Promise(function(resolve, reject){
                    WooCommerce.post('products', datapr, function(err, dt, rs) {
                        if(err){
                            reject(err);
                        }
                        id.push( JSON.parse(rs).id );
                        resolve(id);
                    });
                });

            }
        }
    // await Object.keys(data).forEach(function(it, k){
    //     var datapr = {
    //         name: data[it][k].name,
    //         type: 'variable',
    //     };
    //     WooCommerce.post('products', datapr, function(err, dt, rs) {
    //         id.push( JSON.parse(rs).id );
    //     });
    // });
    // return id;
}
module.exports = function(router){
    router.get('/getproducts', function(req, res){
        getaccesstoken(req).then(response => {
            var options = {
                method: 'get',
                url : 'https://public.kiotapi.com/products?pageSize=5&orderBy=id&lastModifiedFrom=2018-01-01&orderDirection=desc',
                headers : {
                    Retailer : 'namanstore',
                    Authorization : `Bearer ${response.access_token}`
                }
            };
            request(options, function(err, response, data){
                let arrdata = JSON.parse(data);
                return res.status(200).json( _.groupBy(arrdata.data,'masterProductId'));
            });
        });
    });
    router.post('/sync', function(req, res){
        /* create product */
        createproduct(req.body.data).then(rs => {
            return res.status(200).json(rs);
        });
        // pushattr(req.body.data).then(rs => {
        //     return res.status(200).json(rs);
        // });



        // var data = {
        //     name: 'Premium Quality Variation',
        //     type: 'variable',
        //     regular_price: '21.99',
        //     description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.',
        //     short_description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
        //     categories: [
        //         {
        //             id: 9
        //         },
        //         {
        //             id: 14
        //         }
        //     ],
        //     images: [
        //         {
        //             src: 'http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/T_2_front.jpg'
        //         },
        //         {
        //             src: 'http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/T_2_back.jpg'
        //         }
        //     ],
        //     attributes : [
        //         {
        //             'name' : 'Chip',
        //             'variation' : true,
        //             'visible'   : true,
        //             'options'   : [ 'cpy', 'Hồng', 'Tím' ],
        //         }
        //     ]
        // };
        // WooCommerce.post('products', data, function(err, data, rs) {
        //     return res.status(200).json(rs);
        // });
        // var data = {
        //     regular_price: '60.00',
        //     attributes: [
        //         {
        //             option: 'cpy'
        //         }
        //     ]
        // };
        //
        // WooCommerce.post('products/392/variations', data, function(err, data, rs) {
        //     res.status(200).json(rs);
        // });
        // res.status(200).json(rs);
        // var data = {
        //     name: 'xanh lá'
        // };
        //
        // WooCommerce.post('products/attributes/1/terms', data, function(err, data, rs) {
        //     return res.status(200).json(rs);
        // });
    });
}