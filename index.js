require("dotenv").config();
const express = require('express')
const mongoose = require("mongoose");
const app = express()
const port = 8080
const path = require("path");
const bodyParser = require("body-parser")
const MongoClient = require('mongodb').MongoClient

const { MONGO_USER, MONGO_PASS, MONGO_URI, MONGO_DB } = process.env;


main();

function main() {
  MongoClient
    .connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASS}@${MONGO_URI}/${MONGO_DB}?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((connection) => {
      const db = connection.db('projecttech');
      const likesdislikescollection = db.collection('likesdislikes');
  

      const app = express();
      app.set("view engine", "ejs");
      app.set("views", path.join(__dirname, "views"));
      app.use(bodyParser.urlencoded({extended: true}));
      app.use(express.static('static'));
      

      app.get('/', (req, res) => {
        res.render('pages/home.ejs')
      })
    
    
      app.get('/mensen', function(req, res) {    
        const cursor = db.collection('likesdislikes').find().toArray(function(err, results){
          console.log(results);
          res.render('pages/mensen.ejs',{likesendislikes:JSON.stringify(results)});
        });
      });
      
      
      app.post('/quotes', (req, res) => {
        likesdislikescollection.insertOne(req.body)
          .then(result => {
            res.redirect('/');
          })
          .catch(error => console.error(error))
      })

      




      app.use(function (req, res, next) {
        res.status(404).send("Error 404")
      });
      
      app.listen(port, () => {
        console.log(`Server opgestart at http://localhost:${port}`)})
      

    });
}



