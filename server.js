// var bodyParser = require("body-parser");
const fetch = require("node-fetch");
const express = require("express"); //Imports the express module
const app = express(); //Creates an instance of the express module

const PORT = 3000;


// middleware
app.use(express.urlencoded({ extended: true })); // allow us to receive data from formulaire
app.use(express.json()); // allow us to work with json format

app.set("view engine", "ejs"); // the view engine in type of ejs
app.use(express.static("public")); // mention the public directory from which you are serving the static files. Like css/js/image

//Creates a Root Route
app.get("/", function (req, res) {
  res.render("index.ejs");
});

app.get("/Students", async function (req, res) {
  let studentData = await fetch("http://localhost:8080/Students");
  let stud = await studentData.json();
  res.render("students.ejs", { studentArray : stud });
});

app.get("/Groups", async function (req, res) {
  let groupsData = await fetch("http://localhost:8080/Groups");
  let group = await groupsData.json();
  res.render("groups.ejs", { groupsArray : group });
});

app.post("/Students", async function (req, res) {
  fetch("http://localhost:8080/Students", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: req.body.name,
    }),
  })
    .then(function (response) {
      return response.json();
    })
    .then(async function (sucess) {
      console.log("request sucess: ", sucess.name);
    })
    .catch(function (error) {
      console.log("Request failure: ", error);
    });
    res.redirect("Students")
  //res.redirect(req.originalUrl);
});

//Starts the Express server with a callback
app.listen(PORT, function (err) {
  if (!err) {
    console.log("http://localhost:3000/");
  } else {
    console.log(JSON.stringify(err));
  }
});
