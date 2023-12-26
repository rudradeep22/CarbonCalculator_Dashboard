const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: String,
    speaker: String,
    month: String,
});

module.exports = mongoose.model("projects", ProjectSchema);