// const express = require('express');
// file based modules
// build in modules
// third party modyles like express, cloudinary

const dotenv = require('dotenv')
dotenv.config();
const path = require("path");
const express = require('express');
const app = express();
const PORT = 5000;
const cors = require('cors');
const mongoose = require('mongoose');
// const { mongoUrl } = require('./keys');

app.use(cors());
require('./models/model')
require('./models/post')
app.use(express.json())
app.use(require("./routes/auth"))
app.use(require("./routes/createPost"))
app.use(require("./routes/user"))

// mongoose.connect(mongoUrl, {useNewUrlParser: true});
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
// mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true});
// mongoose.connection.on("connected", () => {
//     console.log("successfully connected to mongo")
// })
// mongoose.connection.on("error", () => {
//     console.log("not connected to mongodb");
// })

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(_dirname, "frontend/build")));
    app.get("*", (req, res) => {
        res.sendFile(
            path.join(__dirname, "frontend/build/index.html"),
            function (err) {
                res.status(500).send(err);
            }
        )
    });
}

connectDB().then(() => {

    app.listen(PORT, () => {
        console.log(`server si running on ${PORT}`);
    })
})

// app.listen(PORT, () =>{
//     console.log(`server si running on ${PORT}`);
// })