const mongoose = require("mongoose");

const { Schema } = mongoose;

const taskScheme = new Schema({
  text: String,
  isCheck: {type: Boolean, default: false},
});

module.exports = Task = mongoose.model("tasks", taskScheme);