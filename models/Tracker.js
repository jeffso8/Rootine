const mongoose = require("../database");
const { Schema } = require("../database");

const TrackerSchema = new mongoose.Schema(
	{
    date: String,
    habits: [
      {
        habit_name: String,
        done: Boolean,
      }
    ],
    user:{
			type: Schema.Types.ObjectId,
			ref: "User"
		}
	}
);

const Tracker = mongoose.model("Tracker", TrackerSchema);

module.exports = Tracker;
