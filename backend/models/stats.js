const mongoose = require("mongoose");

const StatsSchema = new mongoose.Schema({
    name: {
        type:String,
        required:false
    },
    linkedinPosts: {
        type:[Number],
        required: false,
    },
    twitterArticles: {
        type:[Number],
        required: false,
    },
    newsPaperArticles: {
        type:[Number],
        required: false,
    },
    projects: {
        type:[Number],
        required: false,
    },
    papers: {
        type:[Number],
        required: false,
    },
    netZeroIITKStatus: {
        type:String,
        required: false,
    },
    netZeroArmyCanttStatus: {
        type:String,
        required: false,
    },
    outreachActivities: {
        type:[String],
        required: false,
    },
    funding1: {
        type:[Number],
        required: false,
    },
    funding2: {
        type:[Number],
        required: false,
    },
    funding3: {
        type:[Number],
        required: false,
    },
    talks: {
        type:[Number],
        required: false,
    },
    linkedinFollowers: {
        type: Number,
        required: false,
    },
    twitterFollowers: {
        type: Number,
        required: false,
    }
});

module.exports = mongoose.model("stats", StatsSchema);