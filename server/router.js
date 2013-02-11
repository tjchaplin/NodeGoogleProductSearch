module.exports = function(app,express,passport) {
    var https = require('https');

    app.get('/',function(request, response){
        ensureAuthenticated(request,response,function(){
            console.log("/ User"+JSON.stringify(request.user));
            response.render('index',{title:app.get('name'),user: request.user});
        });

    });

    app.get('/login',function(request, response){
        console.log("/login User"+JSON.stringify(request.user));
        response.render('index',{title:app.get('name'),user: request.user});
    });

    app.get('/googleProductSearch',function(request, response){
        ensureAuthenticated(request,response,function(request,response){
            var search = request.query["searchString"];
            if(search.length >0)
                search ="+"+search.replace(/ /g,'+');

            var googleProductDataFactory = require('./Factories/GoogleProductDataFactory');

            var googleProductSearch = {};

            googleProductSearch.hostname = 'www.googleapis.com';
            googleProductSearch.path = '/shopping/search/v1/public/products';
            googleProductSearch.key = ''
            googleProductSearch.filters ='country=UK&alt=json&q=disney'+search;
            googleProductSearch.Authorization = request.user.accessToken;

            var googleProductSearchRequst = {
                hostname : googleProductSearch.hostname,
                path : googleProductSearch.path+'?'+googleProductSearch.filters+'&key='+googleProductSearch.key,
                headers : {Authorization: 'Bearer '+googleProductSearch.Authorization},
                Method : 'GET'
            };

            var req = https.request(googleProductSearchRequst,  function(res) {
                console.log("statusCode: ", res.statusCode);
                console.log("headers: ", res.headers);

                var searchView = {};
                var data = '';
                res.on('data', function(chunkedData) {
                    data += chunkedData
                    //process.stdout.write(chunkedData);
                });

                res.on('end',function(){
                    var searchView = googleProductDataFactory.getProductSearchView(JSON.parse(data));
                    response.render('productSearch',{title:app.get('name'),user: request.user,productSearchResults:searchView});
                });
            });
            req.end();


            req.on('error', function(e) {
                console.error(e);
            });
        });
    });



    app.get('/auth/google',
        passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email','https://www.googleapis.com/auth/shoppingapi'] }),
        function(request, response){
            // The request will be redirected to Google for authentication, so this
            // function will not be called.
        });

    // GET /auth/google/callback
    //   Use passport.authenticate() as route middleware to authenticate the
    //   request.  If authentication fails, the user will be redirected back to the
    //   login page.  Otherwise, the primary route function function will be called,
    //   which, in this example, will redirect the user to the home page.
    app.get('/auth/google/callback',
        passport.authenticate('google', { failureRedirect: '/login' }),
        function(request, response) {
            console.log("/auth/google/callback User:"+JSON.stringify(request.user.id));
            response.redirect('/');
        });

    app.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
    });

    function ensureAuthenticated(request, response, next) {
        console.log("request:"+JSON.stringify(request.user));
        if (request.isAuthenticated()) {
            return next(request,response);
        }

        response.redirect('/login');
    }
}
