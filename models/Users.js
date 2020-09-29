const mongoose = require("../database");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
	{
		first_name:{
			type: String
		},
		last_name:{
			type: String
		},
		username: {
			type: String,
			required: true,
			unique: true
		},
		password: {
			type:String
		}
	}
);

UserSchema.methods.generateHash = function(password){

};

UserSchema.methods.validPassword = function(password){
	console.log(password);
	console.log(this.password);
	console.log(password == this.password);

	return password == this.password;
};

User = mongoose.model("User", UserSchema);
module.exports = User;