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

async function createproduct(data){
    var prproduct = [];
    if(data.length > 0){
        for (const pr of data) {
            let da = {
                name : pr[0].name,
                type: 'variable',
                attributes : [],
                categories : []
            };
            let optioncolor = [];
            let optionsize = [];
            for (const item of pr){
                da.categories.push({name : item.categoryName});
                for (const atr of item.attributes){
                    if(atr.attributeName === 'MÀU SẮC'){
                        optioncolor.push(atr.attributeValue);
                    }else{
                        optionsize.push(atr.attributeValue);
                    }
                }
            }
            let uniqColorAttr = optioncolor.reduce(function(a,b){
                if (a.indexOf(b) < 0 ) a.push(b);
                return a;
            },[]);
            let uniqSizeAttr = optionsize.reduce(function(a,b){
                if (a.indexOf(b) < 0 ) a.push(b);
                return a;
            },[]);
            if(uniqColorAttr.length > 0){
                da.attributes.push({
                    id:1,
                    position: 0,
                    visible: true,
                    variation: true,
                    options: uniqColorAttr
                })
            }
            if(uniqSizeAttr.length > 0){
                da.attributes.push({
                    id:2,
                    position: 0,
                    visible: true,
                    variation: true,
                    options: uniqSizeAttr
                })
            }
            prproduct.push(insertproductvariation(da,pr));
        }
    }

    return Promise.all(prproduct);
}
function insertproductvariation(da, prdata){
    new Promise(function(resolve, reject){
        try{
            WooCommerce.post('products', da, function(err, dt, rs){
                if(err){
                    throw err;
                }
                let datares = JSON.parse(rs);
                /* create product variation when have id */
                for (const item of prdata){
                    let datavariation = {
                        regular_price : item.basePrice.toString(),
                        attributes : []
                    };
                    for(const atr of item.attributes){
                        if(atr.attributeName === 'MÀU SẮC'){
                            datavariation.attributes.push({
                                id: 1,
                                option : atr.attributeValue
                            });
                        }else{
                            datavariation.attributes.push({
                                id: 2,
                                option : atr.attributeValue
                            });
                        }
                    }
                    WooCommerce.post(`products/${datares.id}/variations`, datavariation, function(errva, datava, resva) {
                        if(errva){
                            return reject(errva);
                        }
                        return resolve(JSON.parse(resva));
                    });
                }
            });
        }catch (e) {
            console.log(e);
        }

    })
}
async function createTerm(arrdata,termArr, parent = null){
    arrdata.forEach(function(value, key){
        let dt = {
            name: value.categoryName,
        };
        if(parent !== null){
            dt.parent = parent;
        }
        termArr.push(new Promise(function(resolve, reject){
            WooCommerce.post('products/categories', dt, function(err, dataterm, resterm) {
                if(err){
                    return reject(err);
                }
                return resolve(resterm);
            });
        }).then(function(response){
            if(value.hasChild){
                let resparse = JSON.parse(response);
                let idparent = ( resparse.code === 'term_exists' ) ? resparse.data.resource_id : resparse.id;
                createTerm(value.children, termArr, idparent);
            }
        }));
    });
    return Promise.all(termArr);
}
module.exports = function(router){
    router.get('/getproducts', function(req, res){
        getaccesstoken(req).then(response => {
            let pagesize = 100;
            var options = {
                method: 'get',
                url : `https://public.kiotapi.com/products?pageSize=${pagesize}&currentItem=200&orderBy=id&orderDirection=asc`,
                headers : {
                    Retailer : 'namanstore',
                    Authorization : `Bearer ${response.access_token}`
                }
            };
            request(options, function(err, response, data){
                let arrdata = JSON.parse(data);
                let dtres = _.groupBy(arrdata.data,'masterProductId');
                let total = arrdata.total;
                return res.status(200).json( {total : total, data : dtres, pagesize: pagesize} );
            });
        });
    });
    router.post('/sync', function(req, res){
        /* create product */
        createproduct(req.body.data).then(rs => {
            return res.status(200).json(rs);
        });
    });
    router.get('/syncterm', function(req, res){
        getaccesstoken(req).then(response => {
            var options = {
                method : 'get',
                url: 'https://public.kiotapi.com/categories?format=json&includeRemoveIds=true&pageSize=100&currentItem=4&orderBy=categoryName&orderDirection=asc&hierachicalData=true',
                headers :{
                    Retailer : 'namanstore',
                    Authorization : `Bearer ${response.access_token}`
                }
            };
            request(options, function(err, response, data){
                let arrdata = JSON.parse(data).data;
                let termArr = [];
                createTerm(arrdata,termArr).then(rs => {
                    return res.status(200).json(rs);
                });
            });
        });
    });
}