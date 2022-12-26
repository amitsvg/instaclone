// const express = require('express');
// file based modules
// build in modules
// third party modyles like express, cloudinary

const express = require('express');
const app = express();
const PORT = 5000;
const cors = require('cors');
const mongoose = require('mongoose');
const mongoUrl = require('./keys');

app.use(cors());
require('./models/model')
app.use(express.json())
app.use(require("./routes/auth"))

mongoose.connect(mongoUrl, {useNewUrlParser: true});
mongoose.connection.on("connected", () => {
    console.log("successfully connected to mongo")
})
mongoose.connection.on("error", () => {
    console.log("not connected to mongodb");
})


app.listen(PORT, () =>{
    console.log(`server si running on ${PORT}`);
})
