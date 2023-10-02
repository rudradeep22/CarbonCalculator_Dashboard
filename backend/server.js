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
        type:String,
        required: false,
    },
});
const Stats = mongoose.model("stats", StatsSchema);
Stats.createIndexes();

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.get("/getStats", (req, res)=>{
    Stats.find()
    .then(stats => res.json(stats))
    .catch(err => res.json(err))
})

app.post("/register", async (req, resp) => {
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
            })
 
    } catch (e) {
        resp.send(e);
    }
});

app.listen(PORTNO, () => {
    console.log("Listening on port: " + PORTNO);
});