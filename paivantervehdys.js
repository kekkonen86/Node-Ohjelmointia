const http = require('http');
const fs = require('fs'); // file system
const path = require('path'); // tiedostopolkujen muodostamiseen

const templatepolku = path.join(__dirname, 'tervehdys.html');
const weekday = [ "Sunnuntai", "Maanantai","Tiistai","Keskiviikko","Torstai","Perjantai","Lauantai"];

const d = new Date();
let day = weekday[d.getDay()]

const palvelin = http.createServer((rq, res) => {
    fs.readFile(templatepolku, 'utf8', (err, data) => {
        if (err) {
            res.statusCode = 404;
            res.end(err.message); // debuggausta varten. Live-versioon ei teknisiä virheilmoituksia
        }
        else {
            res.writeHead(200, {
                'Content-Type': 'text/html',
                // kerrotaan, että vastauksen pituus on luetun datan pituus
                'Content-Length': Buffer.byteLength(data, 'utf8')
            });
            data = data.replace('##viikonpaiva##', day);
            res.end(data);
        }
    });
});

palvelin.listen(3000);