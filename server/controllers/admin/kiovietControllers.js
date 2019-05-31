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

function createproduct(data){
    var prproduct = [];
    const prs = Object.keys(data);
    for (const pr of prs) {
        if(pr !== 'undefined'){
            let da = {
                name : data[pr][0].name,
                type: 'variable',
                attributes : [],
                categories : []
            };
            let optioncolor = [];
            let optionsize = [];
            for (const item of data[pr]){
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
            prproduct.push(insertproductvariation(da,data[pr]));
        }else{
            for(const itemid of data[pr]){
                let datavariation = {
                    name : itemid.name,
                    type: 'variable',
                    attributes : [],
                    categories : []
                };
                let optioncolor = [];
                let optionsize = [];
                for (const atr of itemid.attributes){
                    if(atr.attributeName === 'MÀU SẮC'){
                        optioncolor.push(atr.attributeValue);
                    }else{
                        optionsize.push(atr.attributeValue);
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
                    datavariation.attributes.push({
                        id:1,
                        position: 0,
                        visible: true,
                        variation: true,
                        options: uniqColorAttr
                    })
                }
                if(uniqSizeAttr.length > 0){
                    datavariation.attributes.push({
                        id:2,
                        position: 0,
                        visible: true,
                        variation: true,
                        options: uniqSizeAttr
                    })
                }
                prproduct.push(new Promise(function(resolve, reject){
                    WooCommerce.post('products', datavariation, function(errvr, datavr, rsvs){
                        let resvs =  JSON.parse(rsvs);
                        let dtresva = {
                            regular_price : itemid.basePrice.toString(),
                            attributes : []
                        };
                        if(itemid.attributes.length > 0){
                            dtresva.attributes.push(
                                {
                                    id: 1,
                                    options: itemid.attributes[0].attributeValue
                                },
                                {
                                    id: 2,
                                    options: itemid.attributes[1].attributeValue
                                }
                            );
                        }
                        WooCommerce.post(`products/${resvs.id}/variations`, dtresva, function(errva, datava, resva) {
                            if(errva){
                                return reject(errva);
                            }
                            return resolve(JSON.parse(resva));
                        });
                    });
                }));
            }
        }
    }
    Promise.all(prproduct).then(function(rs){
        // console.log(rs);
    });
}
function insertproductvariation(da, prdata){
    new Promise(function(resolve, reject){
        WooCommerce.post('products', da, function(err, dt, rs){
            if(err){
                return reject(err);
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
    })
}
module.exports = function(router){
    router.get('/getproducts', function(req, res){
        getaccesstoken(req).then(response => {
            var options = {
                method: 'get',
                url : 'https://public.kiotapi.com/products?pageSize=50&orderBy=id&lastModifiedFrom=2018-01-01&orderDirection=desc',
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
        createproduct(req.body.data);
    });
}