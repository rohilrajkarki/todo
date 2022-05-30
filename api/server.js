const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");

const todoRoute = require("./routes/todo");
const port = process.env.PORT || 5000;

dotenv.config();

const cors = require('cors');
app.use(cors())
app.use(express.json())


mongoose.connect(
    process.env.MONGO_URL
).then(() => console.log("DB connection is Sucessfull!!!"))
    .catch((err) => {
        console.log(err)
    })

app.use("/todo", todoRoute);

app.listen(port, () => {
    console.log('Backend server is running')
})