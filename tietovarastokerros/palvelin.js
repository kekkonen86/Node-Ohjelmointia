//noden kirjastot
const http = require('http');
const path = require('path');

//asetukset
const {
    port, 
    host, 
    tietovarastomoduuli} = require('./config.json');

//omat kirjastot
const {haeKaikki, haeNimella, haeAmmatilla, poistaHenkilo} = require(tietovarastomoduuli);

// luodaan palvelin
const palvelin = http.createServer((req,res)=>{
    const {pathname, searchParams} = new URL(`http://${host}:${port}${req.url}`);
    const reitti = decodeURIComponent(pathname);

    // haetaan, oliko pyynnön metodi (käsky) GET vai POST
    // tämä testipalvelin tukee vain GET-metodia
    const metodi = req.method.toUpperCase();

    if(metodi==='GET') {
        if(reitti==='/'){
            //lähetä tarjolla olevat vaihtoehdot
            res.writeHead(200,{'Content-Type':'text/plain'});
            res.write('/kaikki - hae kaikki\n');
            res.write('/hae?nimi=henkilonimi - hae nimellä\n');
            res.write('/hae?ammatti=henkiloammatti - hae ammatilla\n');
            res.write('/poista?nimi=henkilonimi - poista henkilö');
            res.end();
        }
        else if(reitti==='/kaikki'){
            // lähetä kaikki henkilöt
            let henkilot = haeKaikki();
            res.writeHead(200,{'Content-Type':'text/plain'});
            res.end(JSON.stringify(henkilot));
        }
        else if(reitti==='/hae'){
            // lähetä tietty henkilö (nimi) tai useampi (ammatti) parametrin perusteella
            if(searchParams.has('nimi')) {
                let henkilo = haeNimella(searchParams.get('nimi'));
                res.writeHead(200,{'Content-Type':'text/plain'});
                res.end(JSON.stringify(henkilo));
            }
            else if(searchParams.has('ammatti')) {
                let henkilot = haeAmmatilla(searchParams.get('ammatti'));
                res.writeHead(200,{'Content-Type':'text/plain'});
                res.end(JSON.stringify(henkilot))
            }
        }
        else if(reitti==='/poista'){
            if(searchParams.has('nimi')) {
                let henkilo = poistaHenkilo(searchParams.get('nimi'));
                res.writeHead(200,{'Content-Type':'text/plain'});
                res.end('Poistettu ' + JSON.stringify(henkilo));
            } else {
                res.statusCode=404;
                res.end('Henkilön voi poistaa vain nimen perusteella.');
            }            
        }
        else{
            res.statusCode=404;
            res.end('Sivua ei löytynyt');
        }
    }
    else {
        res.statusCode=404;
        res.end('Metodi ei ole käytössä');
    }
}); //palvelimen loppu

palvelin.listen(port,host,
    ()=>console.log(`palvelin ${host}:${port} kuuntelee`));