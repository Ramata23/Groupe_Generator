// var bodyParser = require("body-parser");
const fetch = require("node-fetch");
const express = require("express"); //Imports the express module
const app = express(); //Creates an instance of the express module


const PORT = 3000; 
let studentArray = [];
let groupsArray = [];

let getStudentName = async () => {
  let studentData = await fetch("http://localhost:8080/Students");
  let stud = await studentData.json();
  for (let index = 0; index < stud.length; index++) {
    studentArray.push(stud[index].name);
  }
};
getStudentName();

let getGroupsName = async () => {
  let groupsData = await fetch("http://localhost:8080/Groups");
  let group = await groupsData.json();
  for (let index = 0; index < group.length; index++) {
    groupsArray.push(group[index].name);
  }
};
getGroupsName();

// let postStudent = async () =>{
//   let studentToAdd = req.body
// }

app.set("view engine", "ejs"); // the view engine in type of ejs
app.use(express.static("public"));// mention the public directory from which you are serving the static files. Like css/js/image
// app.use(bodyParser.urlencoded({ extended: true })); // allow us to use body-parser

//Creates a Root Route
app.get("/", function (req, res) {
  res.render("index.ejs");  
});

app.get("/Students", async function (req, res) {
  res.render("students.ejs", { studentArray });
});

app.get("/Groups", async function (req, res) {
  res.render("groups.ejs", { groupsArray });
});




//Starts the Express server with a callback
app.listen(PORT, function (err) {
  if (!err) {
    console.log("http://localhost:3000/");
  } else {
    console.log(JSON.stringify(err));
  }
});
