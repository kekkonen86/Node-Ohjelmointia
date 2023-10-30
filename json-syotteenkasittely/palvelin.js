const http = require('http');

let henkilot = require('./henkilot.json');

const palvelin = http.createServer( (req, res) => {
    // haetaan tiedostopolku ja hakutermit osoitteesta luodusta URL-oliosta
    const {
        pathname,
        searchParams
    }= new URL(`http://localhost:3000${req.url}`);
    
    res.writeHead(200,{'Content-Type':'application/json', "Access-Control-Allow-Origin": "*"});


    // haetaan henkilön nimellä (samannimisiä on vain yksi)
    if(searchParams.has('nimi')) {
        // käydään JSON-oliot läpi ja etsitään haluttu nimi (sallitaan eri kirjainkoot)
        for (let henkilo of henkilot) {
            if (henkilo.nimi.toLowerCase() == searchParams.get('nimi').toLowerCase()) {
                henkiloJson = JSON.stringify(henkilo);
                res.end(henkiloJson);
            }
        }
    }
    // haetaan henkilön ammatilla (voi olla monta)
    else if(searchParams.has('ammatti')) {
        console.log("testi");
        // tehdään taulukko vastauksia varten
        henkilotaulukko = []
        // käydään JSON-oliot läpi ja etsitään haluttu nimi (sallitaan eri kirjainkoot)
        for (let henkilo of henkilot) {
            if (henkilo.ammatti.toLowerCase() == searchParams.get('ammatti').toLowerCase()) {
                henkilotaulukko.push(henkilo);
            }
        }
        henkiloJson = JSON.stringify(henkilotaulukko);
        res.end(henkiloJson);
    }
    // jotain pitäisi aina lähettää, jotta suoritus ei jää jumiin – tämä voisi olla myös kaikki henkilöt
    else {
        virheJson = JSON.stringify( {error: 'Virheellinen parametri'} );
        res.end(virheJson);

    }
});

palvelin.listen(3000);