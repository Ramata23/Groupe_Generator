const MongoCLient = require("mongodb").MongoClient;
const express = require("express");
const bodyParser = require("body-parser"); // use to parse the body in Json Format

const url = "mongodb://localhost:27017";
const app = express();

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
      res.status(200).send("Students");
    });
    console.log("http://localhost:8080/Students");

    app.post("/Students", function (req, res) {
      let studentToAdd = req.body;
      console.log(studentToAdd.name);
    });
  } catch (error) {
    console.log(error);
  } finally {
    console.log("!==> Success <==! all is good");
    client.close();
  }
};
main();
