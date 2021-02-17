const express = require('express')
const app = express()
const port = 8080

app.set('view engine', 'ejs');

app.use(express.static("static"));

app.get('/', function(req, res) {
  res.render('pages/home.ejs');
});


app.get('/mensen', function(req, res) {
  res.render('pages/mensen.ejs');
});


app.get('/', (req, res) => {
    res.send('Hello World!')
  })


app.get('/test', (req, res) => {
res.send('Dit is een test')
})

app.use(function (req, res, next) {
  res.status(404).send("Error 404")
});

app.listen(port, () => {
    console.log(`Server opgestart at http://localhost:${port}`)
})

