require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose');
const app = express()
const port = process.env.PORT||8080
const path = require('path');
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

const {
  MONGO_USER,
  MONGO_PASS,
  MONGO_URI,
  MONGO_DB
} = process.env;

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

      // alles klaar zetten
      const app = express();
      app.set('view engine', 'ejs');
      app.set('views', path.join(__dirname, 'views'));
      app.use(bodyParser.urlencoded({
        extended: true
      }));
      app.use(express.static('static'));

      // main pagina pakken
      app.get('/', (req, res) => {
        res.render('pages/home.ejs')
      })

      // 2e pagina pakken, Alle content uit database pakken en het in een array gooien. 
      // Vervolgens het javascript value in JSON string zetten
      app.get('/mensen', function (req, res) {
          cursor = db.collection('likesdislikes').find().toArray(function (err, results) {
          console.log(results);
          res.render('pages/mensen.ejs', {
            likesendislikes: JSON.stringify(results)
          });
        });
      });

      // Dit is de form die je redirect naar de homepage
      app.post('/quotes', (req, res) => {
        likesdislikescollection.insertOne(req.body)
          .then(result => {
            res.redirect('/');
          })
          .catch(error => console.error(error))
      })


      // Error al klopt er iets niet
      app.use(function (req, res, next) {
        res.status(404).send('Error 404')
      });

      // Bericht voor in de console om mij de site gemmakelijk te laten openen
      app.listen(port, () => {
        console.log(`Server opgestart at http://localhost:${port}`)
      })


    });
}
