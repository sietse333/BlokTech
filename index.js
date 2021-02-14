const express = require('express')
const app = express()
const port = 8080

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('pages/home.ejs');
});

app.use(express.static("static"));


app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.get('/test', (req, res) => {
res.send('Dit is een test')
})



app.listen(port, () => {
    console.log(`Server opgestart at http://localhost:${port}`)
})

// app.get('/about', function(req, res) {
//   res.render('pages/about.ejs');
// });