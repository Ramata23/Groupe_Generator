const MongoCLient = require("mongodb").MongoClient;
const express = require("express");
const bodyParser = require("body-parser"); // use to parse the body in Json Format

const url = "mongodb://localhost:27017";
const app = express();
/* Array of student */
let myStudentsArray;

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

    /* Students */
    app.get("/Students", function (req, res) {
      const nameOfStudent = dataBase
        .collection("Students")
        .find({})
        .toArray(function (err, result) {
          if (err) throw err;
           myStudentsArray = result
        });
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

    /* Groups */
    app.get("/Groups", function (req, res) {
      res.status(200).send("Groups");
    });
    console.log("http://localhost:8080/Groups");
  } catch (error) {
    console.log(error);
  } finally {
    console.log("!==> Success <==! all is good");
    //client.close();
  }
};
main();

/**
 * @summary catch the student to add and push him into an array, then insert him into the collection Students
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
 * @summary select the student name to delete and delete it in Students collecttion
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
