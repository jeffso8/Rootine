const mongoose = require("../database");
const { Schema } = require("../database");
const { removeAllListeners } = require("./Users");

const HabitSchema = new mongoose.Schema(
	{
		habit_name:{
			type: String
		},
		user:{
			type: Schema.Types.ObjectId,
			ref: "User"
		},
		days:{
			type: Array
		}
	}
);

const Habits = mongoose.model("Habits", HabitSchema);

module.exports = Habits;
