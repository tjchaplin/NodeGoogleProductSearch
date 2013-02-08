module.exports = function(app,express,passport) {
    var https = require('https');

    app.get('/',function(request, response){
        response.render('index',{title:app.get('name')});
    });

    app.get('/login',function(request, response){
        response.render('index',{title:app.get('name')});
    });

    app.get('/productSearch',function(request, response){
        var googleProductSearch = {};

        googleProductSearch.baseUrl = 'https://www.googleapis.com/shopping/search/v1/public/products';
        googleProductSearch.key = ''
        googleProductSearch.filters =[];
        googleProductSearch.url = googleProductSearch.baseUrl+'?'+googleProductSearch.key+'&country=US&alt=json';

        var req = https.get(googleProductSearch.baseUrl,  function(res) {
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

    // Redirect the user to Google for authentication.  When complete, Google
    // will redirect the user back to the application at
    // /auth/google/return
    app.get('/auth/google', passport.authenticate('google'));

    // Google will redirect the user to this URL after authentication.  Finish
    // the process by verifying the assertion.  If valid, the user will be
    // logged in.  Otherwise, authentication has failed.
    app.get('/auth/google/return',
                passport.authenticate('google', { successRedirect: '/',
                failureRedirect: '/login' }));
}
