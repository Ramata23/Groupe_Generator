const MongoCLient = require("mongodb").MongoClient;
const express = require("express");

const url = "mongodb://localhost:27017";
const app = express();

const main = async () => {
    const client = await MongoCLient.connect(url, {useUnifiedTopology: true });
    const dataBase = client.db("groupGenerator");

    try {
        await dataBase.createCollection("Students");
        await dataBase.createCollection("Groups");

        
    } catch (error) {
        console.log(error);
    } finally {
        console.log("!==> Success <==! all is good")
        client.close();
    }

}
main();

app.listen(8080);

app.get('/students', function(req, res){ 
    res.status(200)
})

app.post('/students', function(req, res){ 
    res.status(200)
})

app.delete('/students/:name', function(req, res){ 
    res.status(200)
})

app.get('/groups', function(req, res){ 
    res.status(200)
})

app.get('/groups/:name', function(req, res){ 
    res.status(200)
})

app.post('/groups', function(req, res){ 
    res.status(200)
})

app.delete('/groups/:name', function(req, res){ 
    res.status(200)
})

/* ROUTES */
app.listen(8080);

app.get("/", function (req, res) {
    res.status(200).send("Vous êtes à laccueil");
  });
console.log("http://localhost:8080/");
