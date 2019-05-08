module.exports = function(router){
    router.get('/accessToken', function(req, res){
        var request = require("request");

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
                { client_id: 'fefe0f2f-b817-41ca-9c7b-894af95ba468',
                    client_secret: '7B14D044ECB95369E11241D1172AAA7125B7532E',
                    grant_type: 'client_credentials' } };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            return res.status(200).send(body);
            // console.log(body);
        });


    });
}