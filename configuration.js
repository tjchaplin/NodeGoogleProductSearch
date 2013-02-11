module.exports = function(app,express,passport,GoogleStrategy) {

    app.configure(function(){
        app.set('port', process.env.PORT || 3000);
        app.set('view engine', 'dust');
        app.set('views', app.root+'/views');

        app.use(express.favicon());
        app.use(express.logger('dev'));
        app.use(express.bodyParser());
        app.use(express.methodOverride());
        app.use(express.cookieParser());
        app.use(express.session({ secret: 'very_unique_secret_string',
            cookie: { maxAge: 1800000 }}));


        app.use(passport.initialize());
        app.use(passport.session());

        app.use(app.router);
        app.use(express.static(app.root+'/public', {redirect: false}));
    });

    var users = [];

    var upsertUser = function(user)
    {
        console.log("Upserting User:"+JSON.stringify(user));
        var userIndexToDelete = findUserIndex(user.id);

        if(userIndexToDelete >=0)
            users.slice(userIndexToDelete,1);

        var user = {id:user.id,name:user.name,accessToken:user.accessToken};
        users.push(user);
    }

    var findUserIndex = function(userId)
    {
        for(var i = 0; i< users.length;i++)
        {
            if(users[i].id == userId)
                return i;
        }

        return -1;
    }

    var findById = function(userId, next) {
        var userIndex = findUserIndex(userId);

        var user = {};
        if(userIndex >= 0)
            user = users[userIndex];

        console.log("Users:"+JSON.stringify(user));
        next(null,user);
    };

    passport.serializeUser(function(user, done) {
        upsertUser(user);
        done(null, user.id);
    });

    passport.deserializeUser(function(userId, done) {
        findById(userId, function (err, user) {
            done(err, user);
        });
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
                //var authenticatedUser =  {user:profile,accessToken:accessToken };
                // To keep the example simple, the user's Google profile is returned to
                // represent the logged-in user.  In a typical application, you would want
                // to associate the Google account with a user record in your database,
                // and return that user instead.
                var user = {id:profile.id,name:profile.displayName,accessToken:accessToken};
                return done(null, user);
            });
        }
    ));
}