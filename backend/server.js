const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const db_url = "mongodb+srv://rudradeep22:Rudradeep@cluster0.l3ug8vb.mongodb.net/calculatorStats?retryWrites=true&w=majority";
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
    data: {
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

app.get("/", (req, res)=>{
    res.send("Backend working");
})

app.post("/register", async (req, resp) => {
    try {
        await Stats.create({name:req.body.name,data:req.body.newLectures})
 
    } catch (e) {
        resp.send(e);
    }
});

app.listen(PORTNO, () => {
    console.log("listening on port" + PORTNO);
});