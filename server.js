const express = require('express');  //Imports the express module
const app = express();  //Creates an instance of the express module
const fetch = require ('node-fetch')

const PORT = 3000; //Randomly chosen port
let studentArray = [];

let getStudentName = async ()=>{
    let studentData = await fetch('http://localhost:8080/Students')
    let stud = await studentData.json()
    for (let index = 0; index < stud.length; index++) {
       studentArray.push(stud[index].name) 
    }
    console.log(studentArray);
}
getStudentName()


app.set('view engine','ejs'); 


//Creates a Root Route
app.get('/',function(req, res){
    res.render('index.ejs');  //renders the index.jade file into html and returns as a response. The render function optionally takes the data to pass to the view.
});

app.get('/Students', async function(req, res){
     res.render('students.ejs', {studentArray});  
});

app.get('/Groups',function(req, res){
    res.render('groups.ejs');  
});

//Starts the Express server with a callback
app.listen(PORT, function(err) {
    if (!err) {
        console.log("http://localhost:3000/");
    } else {
        console.log(JSON.stringify(err));
    }
});



