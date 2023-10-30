//noden kirjastot
const http = require('http');
const path = require('path');

//asetukset
const {
    port, 
    host, 
    tietovarastomoduuli,
    apumoduuli} = require('./config.json');

//omat kirjastot
const {haeKaikki, haeNimella, haeAmmatilla, poistaHenkilo, lisaaYksi, muokkaaYksi} = require(tietovarastomoduuli);
const {lahetaValikko, lahetaHenkilot, lahetaPoistoilmoitus, lahetaVirhe, lahetaLisaysilmoitus, muokkausIlmoitus} = require(apumoduuli);

// luodaan palvelin
const palvelin = http.createServer((req,res)=>{
    const {pathname, searchParams} = new URL(`http://${host}:${port}${req.url}`);
    const reitti = decodeURIComponent(pathname);

    // haetaan, oliko pyynnön metodi (käsky) GET vai POST
    // tämä testipalvelin tukee vain GET-metodia
    const metodi = req.method.toUpperCase();

    if(metodi==='GET') {
        if(reitti==='/'){
            lahetaValikko(res);
        }
        else if(reitti==='/kaikki'){
            // lähetä kaikki henkilöt
            let henkilot = haeKaikki();
            lahetaHenkilot(res, henkilot);
        }
        else if(reitti==='/hae'){
            // lähetä tietty henkilö (nimi) tai useampi (ammatti) parametrin perusteella
            if(searchParams.has('nimi')) {
                let henkilo = haeNimella(searchParams.get('nimi'));
                lahetaHenkilot(res, henkilo);
            }
            else if(searchParams.has('ammatti')) {
                let henkilot = haeAmmatilla(searchParams.get('ammatti'));
                lahetaHenkilot(res, henkilot);
            }
        }

        else if(reitti==='/muokkaa') {
            if(searchParams.has('nimi')) {
                let henkilo = muokkaaYksi(searchParams.get('nimi'));
                lahetaMuokkausilmoitus(res, henkilo);
            } else {
                lahetaVirhe(res, 'Henkilöä ei voitu muokata');

            }          
        }
        else if(reitti==='/lisaa') {
            lisaaYksi("kasper", "helsinki", "koodari");
            lisaaYksi = new henkilo;
            lahetaHenkilot(res, henkilo);

        }

        else if(reitti==='/poista'){
            if(searchParams.has('nimi')) {
                let henkilo = poistaHenkilo(searchParams.get('nimi'));
                lahetaPoistoilmoitus(res, henkilo);
            } else {
                lahetaHenkilot(res, henkilot);

            }            
        }
        else{
            lahetaVirhe(res, 'Sivua ei löytynyt');
        }
    }
    else {
        lahetaVirhe('Metodi ei ole käytössä');
    }
}); //palvelimen loppu

palvelin.listen(port,host,
    ()=>console.log(`palvelin ${host}:${port} kuuntelee`));