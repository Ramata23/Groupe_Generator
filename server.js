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

//variable global



//Creates a Root Route
app.get("/", function (req, res) {
  res.render("index.ejs");
});


var allStudents = [];
app.get("/Students", async function (req, res) {
  let studentData = await fetch("http://localhost:8080/Students");
  allStudents = await studentData.json();
  res.render("students.ejs", { studentArray: allStudents });
});


var projectStudentsArray = [];
app.get("/Groups", async function (req, res) {
  let groupsData = await fetch("http://localhost:8080/Groups");
  allGroups = await groupsData.json();
  res.render("groups.ejs", { groupsArray: allGroups, projectStudentsArray });
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
      group: "",
    }),
  })
    .then(function (response) {
      return response.json();
    })
    .then(async function (sucess) {
      console.log("This student be add to the collection: ", sucess.name);
    })
    .catch(function (error) {
      console.log("Request failure: ", error);
    });
  res.redirect("Students");
  //res.redirect(req.originalUrl);
});

app.post("/Groups", async function (req, res) {
  // create array who contains all student name
  let studentData = await fetch("http://localhost:8080/Students");
  let studentJson = await studentData.json();
  let allStudents = await studentJson.map((element) => element.name);

  // create array who contains all the student assign to a group
  let project = await fetch("http://localhost:8080/Groups")
  let projectJson = await project.json()

  let students_Assign = await projectJson.map((element) => element.name_Of_Student)
  let test = await students_Assign.map((element) => element)
  console.log(test);

  let projectName = req.body.projetName;
  let numberOfStudentAssign = req.body.number;

  // student assign to a group
  let students = [];

  for (let index = 1; index <= numberOfStudentAssign; index++) {
    const random = Math.floor(Math.random() * allStudents.length);
    students.push(allStudents[random]);
    allStudents.splice(random, 1);
  }
  // add to the global array
  projectStudentsArray.push(`${projectName} ===> ${students}`);




  fetch("http://localhost:8080/Groups", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: req.body.projetName,
      nbre_student: req.body.number,
      name_Of_Student: students
    }),
  })
    .then(function (response) {
      return response.json();
    })
    .then(async function (sucess) {
      console.log("This group be add to the collection: ", sucess.name);
    })
    .catch(function (error) {
      console.log("Request failure: ", error);
    });

  res.redirect("Groups");
});

//Starts the Express server with a callback
app.listen(PORT, function (err) {
  if (!err) {
    console.log("http://localhost:3000/");
  } else {
    console.log(JSON.stringify(err));
  }
});

/*---------------------------------------------------------
------------------------- FUNCTION PART -------------------
---------------------------------------------------------*/

//Student { name: "", project: ""}
// post Project 1. filter allStudents.filter{ student -> student.project == null} -> update student.project
//get /Projects  : 1 projects (name) 2. SELECT Students where student.projectName == name
