const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require('dotenv').config();

const db_url = process.env.MONGODB_URI;
const PORTNO = process.env.PORT || 3000 ;
const params = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

mongoose.connect(db_url, params)
    .then(() => {
        console.log("Connected to database");
    })
    .catch((err) => {
        console.error(err);
    });

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
const Stats = mongoose.model("stats", StatsSchema);
Stats.createIndexes();

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.get("/api/getStats", (req, res)=>{
    Stats.find()
    .then(stats => res.json(stats))
    .catch(err => res.json(err))
})

app.post("/api/register", async (req, resp) => {
    try {
        await Stats.deleteMany({})
        await Stats.create(
            {name:req.body.name,
            linkedinPosts:req.body.newLinkedinPosts, 
            twitterArticles:req.body.newTwitterArticles,
            newsPaperArticles:req.body.newNewsPaperArticles,
            projects:req.body.newProjects,
            papers:req.body.newPapers,
            netZeroIITKStatus:req.body.newNetZeroIITKStatus,
            netZeroArmyCanttStatus: req.body.newNetZeroArmyCanttStatus,
            outreachActivities:req.body.newOutreachActivities,
            funding1: req.body.newFunding1,
            funding2: req.body.newFunding2,
            funding3: req.body.newFunding3,
            talks: req.body.newTalks,
            linkedinFollowers: req.body.newLinkedinFollowers,
            twitterFollowers: req.body.newTwitterFollowers
            })
 
    } catch (e) {
        resp.send(e);
    }
});

app.listen(PORTNO, () => {
    console.log("Listening on port: " + PORTNO);
});