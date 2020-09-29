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

passport.use(new LocalStrategy({
	//by default, local strategy uses username and password, we will override with email
	usernameField : 'username',
	passwordField : 'password',
	passReqToCallback : true //allows us to pass back the entire request to the callback
	},
	function(req, username, password, done) {
		User.findOne({ username: username}, function(err, user) {
 		if (err) { 
 			return done(err); 
 		}
		if (!user) 
		{
        	return done(null, false, { message: 'Incorrect username.' });
      	}
      	if (!user.validPassword(password)) {
        	return done(null, false, { message: 'Incorrect password.' });
      	}	
      		
      	return done(null, user);
    	});
  	}
));

module.exports = passport