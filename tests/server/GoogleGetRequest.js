var should = require('should');
var https = require('https');

var googleProductSearch = {};
var options = {};
var setup = function(){
    console.log("Setting Up");
    googleProductSearch.baseUrl = 'https://www.googleapis.com/shopping/search/v1/public/products';
    googleProductSearch.key = ''
    googleProductSearch.filters =[];
    googleProductSearch.url = googleProductSearch.baseUrl+'?'+googleProductSearch.key+'&country=US';

    options = {
        hostname : googleProductSearch.baseUrl,
        path : '?key='+googleProductSearch.key+'&country=US',
        method : 'GET'
    };

    console.log('Options:'+options.hostname+options.path+' method:'+options.method);
}

describe('Google Api',function(){
    it("Should be able to query",function(done){
        setup();

        var req = https.get(googleProductSearch.baseUrl,  function(res) {
            console.log("statusCode: ", res.statusCode);
            console.log("headers: ", res.headers);

            res.on('data', function(d) {
                process.stdout.write(d);
                done()
            });
        });
        req.end();

        req.on('error', function(e) {
            console.error(e);
        });

    })
});
