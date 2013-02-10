module.exports = function(app,express,passport,GoogleStrategy) {

    app.configure(function(){
        app.set('port', process.env.PORT || 3000);
        app.set('view engine', 'dust');
        app.set('views', app.root+'/views');

        app.use(passport.initialize());
        app.use(passport.session());

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


    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });


    passport.use(new GoogleStrategy({
            clientID: "",
            clientSecret: "",
            callbackURL: "http://localhost:3000/auth/google/callback"
        },
        function(accessToken, refreshToken, profile, done) {
            console.log("accessToken:"+accessToken);
            console.log("refreshToken:"+refreshToken);
            console.log("profile:"+JSON.stringify(profile));
            // asynchronous verification, for effect...
            process.nextTick(function () {

                // To keep the example simple, the user's Google profile is returned to
                // represent the logged-in user.  In a typical application, you would want
                // to associate the Google account with a user record in your database,
                // and return that user instead.
                return done(null, profile);
            });
        }
    ));
}