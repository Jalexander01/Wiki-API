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







app.route("/articles")
  // #1 How server responds when client sends Get requests (Getting information from our database) 
  // app.get("/articles",);
  .get(function (req, res) {
    Article.find(function (err, foundArticles) {
      if (!err) { }
      res.send(foundArticles);
    });
  })

  .post(function (req, res) {

    // #2 How server responds when client sends Post requests (Getting information from our database) 
    // app.post("/articles",);

    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content
    });
    newArticle.save(function (err) {
      if (!err) {
        res.send("success");

      }
      else {
        res.send(err);
      }
    });
  })


  // #3 How server responds when client sends Delete requests  
  // app.delete("/articles",);


  .delete(function (req, res) {
    Article.deleteMany(function (err) {
      if (!err) {
        res.send("Success");
      } else {
        res.send(err);
      }
    });

  });



app.listen(3000, function () {
  console.log("Server started on port 3000");
});