const mongoose = require("mongoose");

const { Schema } = mongoose;

const TaskScheme = new Schema({
  text: String,
  isCheck: {
    type: Boolean, 
    default: false,
  },
});

module.exports = Task = mongoose.model("Tasks", TaskScheme);