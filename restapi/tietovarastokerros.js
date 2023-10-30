let express = require('express');
let fs = require('fs');
let kurssit = require('./kurssit.json');
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
//var temp = req.body.nimi; 
//console.log(temp)



app.get('/', (req, res) => {
    const webpage = fs.readFileSync('index.html');
    return res.send(String(webpage));
})

app.post('/kurssit', (req, res) => {
   console.log('POST toimii!');
   console.log(req.body);
   const webpage = fs.readFileSync('index.html');
   return res.send(String(webpage));

})

app.post('/kurssit', (req, res) => {
    const newCourse = req.body;
    kurssit.push(newCourse);
    res.send(kurssit);
  });
  
 
app.get('/kurssit', (req, res) => {
    return res.send(kurssit);
});
 
app.get('/kurssit/:kurssi_id', (req, res) => {
    const kurssi_id = req.query.kurssi_id;
    // Tarkistetaan onko löytyykö kurssi_id json tiedostosta
    if (Object.keys(kurssit).includes(kurssi_id)) {
      return res.send(kurssit[kurssi_id]);
    } else {
      return res.status(404).send("kurssia ei löydy");
    }
  });


 



app.listen(3000, () => {console.log("Kuuntelee porttia 3000")}); 