const express = require('express');  //Imports the express module
const app = express();  //Creates an instance of the express module

const PORT = 3000; //Randomly chosen port

app.set('view engine','ejs'); 


//Creates a Root Route
app.get('/',function(req, res){
    res.render('index.ejs');  //renders the index.jade file into html and returns as a response. The render function optionally takes the data to pass to the view.
});

//Starts the Express server with a callback
app.listen(PORT, function(err) {
    if (!err) {
        console.log("http://localhost:3000/");
    } else {
        console.log(JSON.stringify(err));
    }
});