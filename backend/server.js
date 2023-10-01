const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require('dotenv').config();

const db_url = process.env.MONGODB_URI;
const PORTNO = 3000;
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
        required:true
    },
    lectures: {
        type:[Number],
        required: true,
    },
    projects: {
        type:[Number],
        required: true,
    },
    papers: {
        type:[Number],
        required: true,
    }
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
        await Stats.create({name:req.body.name,lectures:req.body.newLectures, projects:req.body.newProjects, papers:req.body.newPapers})
 
    } catch (e) {
        resp.send(e);
    }
});

app.listen(PORTNO, () => {
    console.log("listening on port" + PORTNO);
});