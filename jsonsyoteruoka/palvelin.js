const http = require('http');

let paivat = require('./ruokalista.json');

const palvelin = http.createServer( (req, res) => {
    // haetaan tiedostopolku ja hakutermit osoitteesta luodusta URL-oliosta
    const {
        pathname,
        searchParams
    }= new URL(`http://localhost:3000${req.url}`);
    
    res.writeHead(200,{'Content-Type':'application/json', "Access-Control-Allow-Origin": "*"});


    // haetaan henkilön nimellä (samannimisiä on vain yksi)
    if(searchParams.has('paiva')) {
        // käydään JSON-oliot läpi ja etsitään haluttu nimi (sallitaan eri kirjainkoot)
        for (let paiva of paivat) {
            if (paiva.paiva.toLowerCase() == searchParams.get('paiva').toLowerCase()) {
                paivaJson = JSON.stringify(paiva);
                res.end(paivaJson);
            }
        }
    }    
    // jotain pitäisi aina lähettää, jotta suoritus ei jää jumiin – tämä voisi olla myös kaikki henkilöt
    else {
        virheJson = JSON.stringify( {error: 'Virheellinen parametri'} );
        res.end(virheJson);

    }
});

palvelin.listen(3000);

// 'use strict';

// const ruokalista = require('./ruokalista.json');

// // console.log(ruokalista[0]);
// // console.log(ruokalista[1]);
// // console.log(ruokalista[2]);
// // console.log(ruokalista[3]);
// // console.log(ruokalista[4]);
// let maanantai = ruokalista[0];
// let tiistai = ruokalista[1];
// let keskiviikko = ruokalista[2];
// let torstai = ruokalista[3];
// let perjantai = ruokalista[4];

// const http = require('http');
// const palvelin = http.createServer((req, res) => {
//     // selvitetään, mitä sivua pyydetään
//     const kokoUrl = new URL(`http://${req.hostname}${req.url}`);
//     // dekoodataan, jotta ääkköset, välilyönnit ja muut tulevat oikein
//     const reitti = decodeURIComponent(kokoUrl.pathname);
    
    

//     if(reitti == '/') { // localhost:3000
//         res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
//         res.write('\nTervetuloa Node.js-palvelimelle\n');
//         res.write('\nNäät päivän ruokalistan seuraavilla komennoilla:\n');
//         res.write('\n/maanantai\n');
//         res.write('\n/tiistai\n');
//         res.write('\n/keskiviikko\n');
//         res.write('\n/torstai\n');
//         res.write('\n/perjantai\n');
//         res.end();

//     }

//     else if(reitti == '/maanantai'){ // localhost:3000/kirjasto
//         res.writeHead(200, { 'Content-Type': 'application/json' });
//         res.write(JSON.stringify(maanantai));
//         res.end();

//     }
//     else if(reitti == '/tiistai'){ // localhost:3000/kirjasto
//         res.writeHead(200, { 'Content-Type': 'application/json' });
//         res.write(JSON.stringify(tiistai));
//         res.end();

//     }
//     else if(reitti == '/keskiviikko'){ // localhost:3000/kirjasto
//         res.writeHead(200, { 'Content-Type': 'application/json' });
//         res.write(JSON.stringify(keskiviikko));
//         res.end();

//     }
//     else if(reitti == '/torstai'){ // localhost:3000/kirjasto
//         res.writeHead(200, { 'Content-Type': 'application/json' });
//         res.write(JSON.stringify(torstai));
//         res.end();

//     }
//     else if(reitti == '/perjantai'){ // localhost:3000/kirjasto
//         res.writeHead(200, { 'Content-Type': 'application/json' });
//         res.write(JSON.stringify(perjantai));
//         res.end();

//     }

    

//     else {
//         res.statusCode = 404;
//         res.end('Sivua ei löytynyt');

//     }
// });

// palvelin.listen(3000, "localhost", function(){ console.log("localhost:3000 kuuntelee..."); });
