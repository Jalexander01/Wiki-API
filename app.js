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






//////////////////////requesting all articles/////////////////////
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

//////////////////////requesting specific article/////////////////////


app.route("/articles/:articleTitle")


  .get(function (req, res) {
    Article.findOne({ title: req.params.articleTitle }, function (err, foundArticle) {
      if (foundArticle) {
        res.send(foundArticle);

      } else {
        res.send("not found");

      }

    })
  })

  .put(function (req, res) {
    Article.update(
      { title: req.params.articleTitle },
      { title: req.body.title, content: req.body.content },
      { overwrite: true },
      function (err) {
        if (!err) {
          res.send("sucess");
        } else {
          res.send(err);
        }
      }
    );
  })



  .patch(function (req, res) {

    Article.update(
      { title: req.params.articleTitle },
      { $set: req.body },
      function (err) {
        if (!err) {
          res.send("Successfully updated article.");
        } else {
          res.send(err);
        }
      }
    );
  })

  .delete(function (req, res) {
    Article.deleteOne(
      { title: req.params.articleTitle },
      function (err) {
        if (!err) {
          res.send("Successfully deleted the corresponding article.");
        } else {
          res.send(err);
        }
      }
    );
  });






app.listen(3000, function () {
  console.log("Server started on port 3000");
});