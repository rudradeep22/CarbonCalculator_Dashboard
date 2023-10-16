const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcryptjs")
const cors = require("cors");
const jwt = require("jsonwebtoken");
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

const User = require("./models/user");
const Stats = require("./models/stats");
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

app.post("/signup", async (req, res) => {
    try{
        const { email, password} = req.body;
        if (!(email && password)) {
            res.status(400).send("All input is required");
          }
        const oldUser = await User.findOne({ email });
        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
          }
        encryptedUserPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email: email.toLowerCase(),
            password: encryptedUserPassword,
          });
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "5h",
            }
        );
        user.token = token;
        res.status(201).json(user);
    }
    catch (err) {
        console.log(err);
      }
})
app.post("/signin", async (req, res) => {
    try{
        const { email, password } = req.body;
        if (!(email && password)) {
            res.status(400).send("All input is required");
          }
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
              { user_id: user._id, email },
              process.env.TOKEN_KEY,
              {
                expiresIn: "5h",
              }
            );
        user.token = token;
        return res.status(200).json(user);
            }
        return res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }
})

app.listen(PORTNO, () => {
    console.log("Listening on port: " + PORTNO);
});