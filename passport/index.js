const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');

let User = require('../models/Users');


//used to serialize the user for the session
passport.serializeUser(function(user,done){
	done(null, user.id);
})

//used to deserialize the userfU
passport.deserializeUser(function(id, done){
	User.findById(id, function(err, user){
		done(err, user)
	});
});

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
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
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