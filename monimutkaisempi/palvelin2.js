const http = require('http');

let henkilot = require('./henkilot.json');

// määritellään sallitut datatyypit
const sallitutTyypit=[
    'application/x-www-form-urlencoded',
    'application/json'
];

// takaisinkutsu-muuttujaan menee funktio – tämä on Javascriptissä täysin sallittua
// sekä pyyntö että vastaus pitää saada, jotta vastaus-olio voidaan antaa takaisinkutsufunktiolle
const kasittelePostData = (req, res, takaisinkutsu) => {
    // selvitetään pyynnön datatyyppi
    const tyyppi = req.headers['content-type'];

    // jos sallittu tyyppi, luetaan data puskuriin pala kerrallaan
    if(sallitutTyypit.includes(tyyppi)){
        const datapuskuri=[];
        req.on('data', (datapala) => {
            datapuskuri.push(datapala);
        });
        // kun data loppuu, muodostetaan siitä merkkijono
        req.on('end', ()=>{
            const data=Buffer.concat(datapuskuri).toString();
            // JSON-datasta saa helposti olion parse-metodilla
            if(tyyppi==='application/json'){
                // jos takaisinkutsufunktio on lahetaVastaus, tämä muuttuu muotoon lahetaVastaus(res, JSON.parse(data);
                takaisinkutsu(res, JSON.parse(data));
            }
            else{
                // lomakkeelta tuleva data vaatii hieman enemmän purkamista hakutermiolion avulla
                const params = new URLSearchParams(data);
                const jsonResult={};
                // tehdään jokaisesta hakutermistä Javascript-olio
                params.forEach((arvo,nimi) => {
                    jsonResult[nimi] = arvo;
                });
                takaisinkutsu(res, jsonResult);
            }
        });
    }
    else {
        takaisinkutsu(res, 'Virheellinen tyyppi');
    }
};

// tämän funktion vastuulla on lähettää vastaus selaimelle
const lahetaVastaus = (res, pyyntodata) => {
    // jos tyyppi ei ollut sallittu, annetaan virheilmoitus ja lopetetaan
    if(pyyntodata == 'Virheellinen tyyppi') {
        res.writeHead(404, {'Content-Type':'text/plain'});
        res.end('Virheellinen POST-tyyppi');
        return;
    }
    res.writeHead(200,{'Content-Type':'application/json'});

    // haetaan henkilön nimellä (samannimisiä on vain yksi)
    if('nimi' in pyyntodata) {
        // käydään JSON-oliot läpi ja etsitään haluttu nimi (sallitaan eri kirjainkoot)
        for (let henkilo of henkilot) {
            if (henkilo.nimi.toLowerCase() == pyyntodata.nimi.toLowerCase()) {
                henkiloJson = JSON.stringify(henkilo);
                res.end(henkiloJson);
            }
        }
    }
    // haetaan henkilön ammatilla (voi olla monta)
    else if('ammatti' in pyyntodata) {
        // tehdään taulukko vastauksia varten
        henkilotaulukko = []
        // käydään JSON-oliot läpi ja etsitään haluttu nimi (sallitaan eri kirjainkoot)
        for (let henkilo of henkilot) {
            if (henkilo.ammatti.toLowerCase() == pyyntodata.ammatti.toLowerCase()) {
                henkilotaulukko.push(henkilo);
            }
        }
        henkiloJson = JSON.stringify(henkilotaulukko);
        res.end(henkiloJson);
    }
    else {
        virheJson = JSON.stringify({error: 'Virheellinen parametri'});
        res.end(virheJson);
    }  
}

const palvelin = http.createServer( (req, res) => {
    // käsitellään funktiossa pyynnön POST-tyyppinen data. Takaisinkutsufunktio huolehtii vastauksen lähettämisestä.
    kasittelePostData(req, res, lahetaVastaus);

});

palvelin.listen(3000);