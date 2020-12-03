const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const passport = require('passport');
// const env = require('./.env');
const User = require('../models/Users');
require('dotenv').config();

//used to serialize the user for the session
passport.serializeUser(function(user,done){
	done(null, user.id)
});

//used to deserialize the user
passport.deserializeUser(function(id, done){
	User.findById(id, function(err, user){
		done(err, user)
	});
});


passport.use(new GoogleStrategy({
    clientID: process.env.REACT_APP_CLIENT_ID,
    clientSecret: process.env.REACT_APP_CLIENT_SECRET,
    callbackURL: "/auth/google/rootine",
    userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo'
  }, (accessToken, refreshToken, profile, done) => {
    User.findOne({googleId: profile.id}).then((currentUser) => {
        console.log("profile", profile);
        if(currentUser){
            console.log("user is", currentUser);
            done(null, currentUser);
        } else {
            new User({
                googleId: profile.id,
                first_name: profile.name.givenName,
                last_name: profile.name.familyName,
                email: profile._json.email
            }).save().then((newUser) => {
                console.log('new user created:' + newUser);
                done(null, newUser);
            });
        }
    }) 
    })
);

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "/auth/facebook/rootine",
    profileFields: ['id', 'emails', 'name']
  }, (accessToken, refreshToken, profile, done) => {
    User.findOne({ facebookId: profile.id }).then((currentUser) => {
        console.log("profile", profile);
        if(currentUser){
            console.log("user is", currentUser);
            done(null, currentUser);
        } else {
            new User({
                facebookId: profile.id,
                first_name: profile.displayName,
                email: profile._json.email
            }).save().then((newUser) => {
                console.log('new user created:' + newUser);
                done(null, newUser);
            });
        }
    })
    })
);

//passport strategy for logging in
passport.use("local-login", new LocalStrategy({
	//by default, local strategy uses username and password, we will override with email
	usernameField : 'email',
	passwordField : 'password',
	passReqToCallback : true //allows us to pass back the entire request to the callback
	},
	function(req, email, password, done) {
		User.findOne({ email: email}, function(err, user) {
 		if (err) { 
 			return done(err); 
 		}
		if (!user) 
		{
        	return done(null, false, { message: 'Incorrect email.' });
      	}
      	if (!user.validPassword(password)) {
        	return done(null, false, { message: 'Incorrect password.' });
      	}		
      	return done(null, user);
    	});
  	}
));

//passport strategy for signing up
passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {

        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'email' :  email }, function(err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            // check to see if theres already a user with that email
            if (user) {
                return done(null, false, { message: 'This email is already in use.' });
            } else {

                // if there is no user with that email
                // create the user
                var newUser = new User();

                // set the user's local credentials
                newUser.first_name = req.body.first_name;
                newUser.last_name = req.body.last_name;
                newUser.email    = email;
                newUser.password = newUser.generateHash(password);

                // save the user
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }
        });    
    });
}));

module.exports = passport;
