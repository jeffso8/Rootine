const mongoose = require("../database");
const bcrypt = require("bcrypt");
const findOrCreate = require("mongoose-findorcreate");
const { Schema } = require("../database");

const UserSchema = new mongoose.Schema(
	{
		first_name:{
			type: String
		},
		last_name:{
			type: String
		},
		email: {
			type: String,
			required: true,
			unique: true
		},
		password: {
			type:String
		},
		googleId: {
			type:String
		},
		habits: [{
			type: Schema.Types.ObjectId,
			ref: "Habits"
		}]
	}	
);

UserSchema.plugin(findOrCreate);

UserSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.password);
	//return password == this.password;
};


const User = mongoose.model("User", UserSchema);
module.exports = User;
