var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var LinkedInStrategy = require('passport-linkedin').Strategy;

var bCrypt = require('bcrypt');
var User;

module.exports = function (passport, app, configs, Models) {

    User = Models.User;
    createOrLoadAdminUser(configs);


    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        Models.User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    // use local Strategy for admin login
    passport.use('local', new LocalStrategy({ passReqToCallback: true }, localStrategy));

    // register google authentication
    passport.use('google', new GoogleStrategy({
        clientID: configs.auth.google.clientID,
        clientSecret: configs.auth.google.clientSecret,
        callbackURL: configs.auth.google.callbackURL,
    }, googleStrategy));

    // register linkedin authentication
    passport.use('linkedin', new LinkedInStrategy({
        consumerKey: configs.auth.linkedin.consumerKey,
        consumerSecret: configs.auth.linkedin.consumerSecret,
        callbackURL: configs.auth.linkedin.callbackURL,

        profileFields: ['id', 'first-name', 'last-name', 'email-address', 'headline', 'public-profile-url']
    }, linkedinStrategy))

    // register login routes
    app.post('/api/auth/login/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.post('/api/auth/login/linkedin', passport.authenticate('linkedin', { scope: ['r_basicprofile', 'r_emailaddress'] }));

    // register callback routes
    app.get('/api/auth/callback/google', passport.authenticate('google', { successRedirect : '/', failureRedirect : '/login' }));
    app.get('/api/auth/callback/linkedin', passport.authenticate('linkedin', { successRedirect : '/', failureRedirect : '/login' }));

    // logout route
    app.post("/api/auth/logout", function (req, res) {
        req.logout();
        res.redirect('/');
    })
};

function linkedinStrategy(token, tokenSecret, profile, done) {
    User.findOrCreate({ authDomain: 'linkedin', 'linkedin.id': profile.id }, function (err, user) {
        if (err) {
            return done(err);
        }

        if (user) {
            return done(null, user);
        } else {
            var newUser = new User();

            email = profile["email-address"]
            newUser.name = profile["first-name"] + " " + profile["last-name"];
            newUser.authDomain = "linkedin";
            newUser.email = email;

            newUser.linkedin = profile;

            // save the user
            newUser.save(function (err) {
                if (err) {
                    throw err;
                }
                return done(null, newUser);
            });
        }
    });
};

function googleStrategy(token, refreshToken, profile, done) {

    // make the code asynchronous
    // User.findOne won't fire until we have all our data back from Google
    process.nextTick(function () {

        // try to find the user based on their google id
        User.findOne({ authDomain: 'google', 'google.id': profile.id }, function (err, user) {
            if (err) {
                return done(err);
            }

            if (user) {
                return done(null, user);
            } else {
                // if the user isnt in our database, create a new user
                var newUser = new User();
                email = profile.emails[0].value;
                newUser.name = email;
                newUser.authDomain = "google";
                newUser.email = email;

                newUser.google = {
                    id: profile.id,
                    token: token,
                    name: profile.displayName,
                    email: email
                };

                // save the user
                newUser.save(function (err) {
                    if (err) {
                        throw err;
                    }
                    return done(null, newUser);
                });
            }
        });
    });
};

function localStrategy(req, username, password, done) {
    // check in mongo if a user with username exists or not
    User.findOne({ 'name': username, authDomain: 'local' }, function (err, user) {
        if (err) {
            return done(err);
        }

        // Username does not exist, log error & redirect back
        if (!user) {
            console.log('User Not Found with username ' + username);
            return done(null, false, req.flash('message', 'User Not found.'));
        }
        // User exists but wrong password, log the error 
        if (!isValidPassword(user, password)) {
            console.log('Invalid Password!');
            return done(null, false, req.flash('message', 'Invalid Password'));
        }
        // User and password both match, return user from 
        // done method which will be treated like success
        return done(null, user);
    }
    );
};

function createOrLoadAdminUser(configs) {
    User.findOne({ name: configs.auth.admin.name, authDomain: 'local' }, function (err, user) {
        if (err) {
            throw err;
        }

        if (!user) {
            var newUser = new User();
            // set the user's local credentials
            newUser.name = configs.auth.admin.name;
            newUser.password = createHash(configs.auth.admin.password);
            newUser.authDomain = 'local';
            newUser.email = configs.auth.admin.email;

            // save the user
            newUser.save(function (err) {
                if (err) {
                    console.log('Error in Saving user: ' + err);
                    throw err;
                }
                console.log('Admin user created successfully!');
            });
        }
    })
};


var isValidPassword = function (user, password) {
    return bCrypt.compareSync(password, user.password);
};

// Generates hash using bCrypt
var createHash = function (password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}