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
    app.get("/Students", async function (req, res) {
      res.status(200).send(await showStudent(dataBase));
    });

    console.log("http://localhost:8080/Students");

    /* Students POST - Add a student */
    app.post("/Students", function (req, res) {
      addToStudentsCollection(dataBase, req);
      res.status(200).send(req.body);
    });

    /* Students Delete */
    app.delete("/Students/:name", function (req, res) {
      deleteStudentsToCollection(dataBase, req);
      res.status(200).send(req.params.name);
    });

    /*---------------------------------------------------------
    ------------------------- GROUPS PART ---------------------
    ---------------------------------------------------------*/

    /* Groups */
    app.get("/Groups", async function (req, res) {
      res.status(200).send(await showGroup(dataBase));
    });
    console.log("http://localhost:8080/Groups");

    /* Groups name  must be completed */
    app.get("/Groups/:name", async function (req, res) {
      res.status(200).send( await searchByGroupName(dataBase, req));
    });

    /* Groups Post */
    app.post("/Groups", function (req, res) {
      addToGroupsCollection(dataBase, req);
      res.status(200).send(req.body);
    });

    /* Groups Delete  */
    app.delete("/Groups/:name", function (req, res) {
      deleteGroupsToCollection(dataBase, req);
      res.status(200).send(req.params.name);
    });
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

let searchByGroupName = async (dataBase, req) => {
  // let test;
  const nameOfGroup = await dataBase
    .collection("Groups")
    .find({ name: req.params.name })
    .toArray();

    if (nameOfGroup.length != 0) {
      return nameOfGroup;
    } else {
      return ("this group does not exist")
    }

};

/**
 * @summary catch the "Student "to add and push him into an array, then insert him into the collection Students
 * @param {*} dataBase
 * @param {*} req
 */
let addToStudentsCollection = async (dataBase, req) => {
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
let deleteStudentsToCollection = async (dataBase, req) => {
  try {
    let studentName = req.params.name;
    await dataBase.collection("Students").deleteOne({ name: studentName });
  } catch (error) {
    console.log(error);
  }
};

/**
 * @summary read the Students collection and assign the content to nameOfStudent
 * @returns an array of students stock in the collection Students (nameOfStudent)
 * @param {*} dataBase
 */
let showStudent = async (dataBase) => {
  const nameOfStudent = await dataBase.collection("Students").find().toArray();
  return nameOfStudent;
};

/**
 * @summary read the Groups collection and assign  the content to nameOfGroup
 * @param {*} dataBase
 * @returns an array of groups stock in the collection Groups (nameOfGroup)
 */
let showGroup = async (dataBase) => {
  const nameOfGroup = await dataBase.collection("Groups").find().toArray();
  return nameOfGroup;
};

let addToGroupsCollection = async (dataBase, req) => {
  try {
    let arrayForMyGroupsToAdd = [];
    let groupsToAdd = req.body;
    arrayForMyGroupsToAdd.push(groupsToAdd);
    await dataBase.collection("Groups").insertMany(arrayForMyGroupsToAdd);
  } catch (error) {
    console.log(error);
  }
};

let deleteGroupsToCollection = async (dataBase, req) => {
  try {
    let groupName = req.params.name;
    await dataBase.collection("Groups").deleteOne({ name: groupName });
  } catch (error) {
    console.log(error);
  }
};
