const mongoose = require("../database");
const { Schema } = require("../database");

const CompletionSchema = new mongoose.Schema(
  {
    user:{
			type: Schema.Types.ObjectId,
			ref: "User"
    },
    dates:[
      {
      month: String,
      days: Array
    }],
  }
);

const Completion = mongoose.model("Completion", CompletionSchema);

module.exports = Completion;