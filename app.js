const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');


app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", { useNewUrlParser: true, useUnifiedTopology: true });

const articleSchema = {
  title: String,
  content: String
};

const Article = mongoose.model("Article", articleSchema);


// #1 How server responds to Get requests (Getting information from our database) 
app.get("/articles", function (req, res) {
  Article.find(function (err, foundArticles) {
    if (!err) { }
    res.send(foundArticles);
  });
});


app.listen(3000, function () {
  console.log("Server started on port 3000");
});