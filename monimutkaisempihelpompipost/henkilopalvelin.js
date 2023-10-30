let express = require('express');
let fs = require('fs');
let henkilot = require('./henkilot.json');
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
//var temp = req.body.nimi; 
//console.log(temp)



app.get('/', (req, res) => {
    const webpage = fs.readFileSync('index.html');
    return res.send(String(webpage));
})

app.post('/henkilot', (req, res) => {
   console.log('POST toimii!');
   console.log(req.body);
   const webpage = fs.readFileSync('index.html');
   return res.send(String(webpage));

})
 
app.get('/henkilot', (req, res) => {
    return res.send(henkilot);
});
 
app.get('/henkilot/:henkilo_id', (req, res) => {
    const henkilo_id = req.params.henkilo_id;
    // Tarkistetaan onko löytyykö henkilo_id json tiedostosta
    if(Object.keys(henkilot).includes(henkilo_id)){
        return res.send(henkilot[henkilo_id]);
    }
    else {
        return res.status(404).send("Henkilöä ei löydy");
    }
});
 
app.listen(3000, () => {console.log("Kuuntelee porttia 3000")});