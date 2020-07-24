const MongoCLient = require("mongodb").MongoClient;
const express = require("express");
const bodyParser = require("body-parser"); // use to parse the body in Json Format

const url = "mongodb://localhost:27017";
const app = express();
/* Array of student */
let myStudentsArray;
let myGroupsArray;

const main = async () => {
  /* MONGO conection and DataBase création*/
  const client = await MongoCLient.connect(url, { useUnifiedTopology: true });
  const dataBase = client.db("groupGenerator");

  try {
    /* Create Collection */
    await dataBase.createCollection("Students");
    await dataBase.createCollection("Groups");

    /* ROUTES */
    app.listen(8080);

    // middlewear allows  us to support different format
    app.use(bodyParser.json()); // use by req.body property (to have key value)
    app.use(express.urlencoded({ extended: true }));

    /* Accueil */
    app.get("/", function (req, res) {
      res.status(200).send("Vous êtes à laccueil");
    });
    console.log("http://localhost:8080/");

    /*---------------------------------------------------------
    ------------------------- STUDENTS PART -------------------
    ---------------------------------------------------------*/

    /* Students */
    app.get("/Students", function (req, res) {
      showStudent(dataBase);
      res.status(200).send(myStudentsArray);
    });
    console.log("http://localhost:8080/Students");

    /* Students POST */
    app.post("/Students", function (req, res) {
      addToCollection(dataBase, req);
      console.log();
    });

    /* Students Delete */
    app.delete("/Students/:name", function (req, res) {
      deleteToCollection(dataBase, req);
    });

    /*---------------------------------------------------------
    ------------------------- GROUPS PART ---------------------
    ---------------------------------------------------------*/

    /* Groups */
    app.get("/Groups", function (req, res) {
      showGroup(dataBase);
      res.status(200).send(myGroupsArray);
    });
    console.log("http://localhost:8080/Groups");

    /* Groups name */
    app.get("/Groups/:name", function (req, res) {
      let groupsName = req.params.name;
      res.status(200).send();
    });

    /* Groups Post */
    app.post("/Groups", function (req, res) {
      res.status(200).send();
    });

    /* Groups Delete  */
  } catch (error) {
    console.log(error);
  } finally {
    console.log("!==> Success <==! all is good");
    //client.close();
  }
};
main();





/*---------------------------------------------------------
------------------------- FUNCTION PART -------------------
---------------------------------------------------------*/

/**
 * @summary catch the "Student "to add and push him into an array, then insert him into the collection Students
 * @param {*} dataBase
 * @param {*} req
 */
let addToCollection = async (dataBase, req) => {
  try {
    let arrayForMyStudentToAdd = [];
    let studentToAdd = req.body;
    arrayForMyStudentToAdd.push(studentToAdd);
    await dataBase.collection("Students").insertMany(arrayForMyStudentToAdd);
  } catch (error) {
    console.log(error);
  }
};

/**
 * @summary select the "Students" name to delete and delete it in Students collecttion
 * @param {*} dataBase
 * @param {*} req
 */
let deleteToCollection = async (dataBase, req) => {
  try {
    let studentName = req.params.name;
    await dataBase.collection("Students").deleteOne({ name: studentName });
  } catch (error) {
    console.log(error);
  }
};

/**
 * @summary read the "Students" collection and push it into myStudentsArray
 * @param {*} dataBase
 */
let showStudent = async (dataBase) => {
  const nameOfStudent = dataBase
    .collection("Students")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      myStudentsArray = result;
    });
};

/**
 *@summary read the "Groups" collection then assign it to myGroupsArray
 * @param {*} dataBase
 */
let showGroup = async (dataBase) => {
  const nameOfStudent = dataBase
    .collection("Groups")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      myGroupsArray = result;
    });
};
