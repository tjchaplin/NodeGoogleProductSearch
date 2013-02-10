module.exports = function(app,express,passport) {
    var https = require('https');

    app.get('/',function(request, response){
        console.log("/ User"+JSON.stringify(request.user));
        response.render('index',{title:app.get('name')});
    });

    app.get('/login',function(request, response){
        console.log("/login User"+JSON.stringify(request.user));
        response.render('index',{title:app.get('name'),user: request.user});
    });

    app.get('/productSearch',function(request, response){
        var googleProductSearch = {};

        googleProductSearch.hostname = 'www.googleapis.com';
        googleProductSearch.path = '/shopping/search/v1/public/products';
        googleProductSearch.key = ''
        googleProductSearch.filters ='country=US&alt=json';
        googleProductSearch.Authorization = '';

        var googleProductSearchRequst = {
            hostname : googleProductSearch.hostname,
            path : googleProductSearch.path+'?'+googleProductSearch.filters+'&key='+googleProductSearch.key,
            headers : {Authorization: 'Bearer '+googleProductSearch.Authorization},
            Method : 'GET'
        };

        var req = https.request(googleProductSearchRequst,  function(res) {
            console.log("statusCode: ", res.statusCode);
            console.log("headers: ", res.headers);

            res.on('data', function(d) {
                process.stdout.write(d);
            });
            response.render('index',{title:app.get('name')});
            //res.render('/', { user: req.user, message: req.flash('error') });
        });
        req.end();


        req.on('error', function(e) {
            console.error(e);
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
            console.log("/auth/google/callback User"+JSON.stringify(request.user));
            response.redirect('/');
        });

    app.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
    });

    function ensureAuthenticated(req, res, next) {
        if (req.isAuthenticated()) { return next(); }
        res.redirect('/login');
    }
}
