const express = require("express")
const { json, urlencoded } = express
const cors = require("cors")
const bodyParser = require('body-parser');


require("dotenv").config();

const app = express()
app.use(express.json());
app.use(urlencoded({ extended: false }));
app.use(cors())
app.set("view engine", "ejs")
app.use(bodyParser.json());

const db = require("./DB/db");

const UCar_R = require('./routes/UCar_R');
const User_R = require('./routes/User_R');
const UChat_R = require('./routes/UChat_R');
const Event = require('./routes/Event_R');

app.use('/c', UCar_R);
app.use('/u', User_R);
app.use('/m', UChat_R);
app.use('/e', Event);

// port
const port = process.env.PORT || 8080

// listener
app.listen(port, () => { console.log("Server started!") })