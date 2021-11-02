const express = require("express");
const mongoose = require("mongoose");
const Router = require("./routes/routes")

const app = express();

app.use(express.json());



mongoose.connect('mongodb://localhost/playMyPlayList',{useNewUrlParser:true,useUnifiedTopology:true});
mongoose.connection.once('open',function(){
    console.log('connection has been made')
}).on('error',function(){
    console.log("error is:",error)
})
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

const port = process.env.PORT || 8080;
app.use(Router);

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});