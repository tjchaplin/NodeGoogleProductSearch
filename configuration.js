module.exports = function(app,express,passport,GoogleStrategy) {

    app.configure(function(){
        app.set('port', process.env.PORT || 3000);
        app.set('view engine', 'dust');
        app.set('views', app.root+'/views');

        app.use(app.router);

        app.use(express.favicon());
        app.use(express.logger('dev'));
        app.use(express.bodyParser());
        app.use(express.methodOverride());
        app.use(express.cookieParser());
        app.use(express.session({ secret: 'very_unique_secret_string',
            cookie: { maxAge: 1800000 }}));
        app.use(express.static(app.root+'/public', {redirect: false}));
    });

    passport.use(new GoogleStrategy({
            returnURL: 'http://localhost:3000/auth/google/return',
            realm: 'http://localhost:3000'
        },
        function(identifier, profile, done) {
            console.log("identifier:"+identifier+" :");
            done();
        }
    ));
}