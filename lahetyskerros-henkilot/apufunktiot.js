/* Tämä moduuli muotoilee ja lähettää dataa asiakkaalle erilaisilla funktioilla. */

const http = require('http');

// määritellään alku- ja loppu-HTML
const htmlAlku =`
    <!DOCTYPE html>
    <html lang="fi">
    <head>
        <meta charset="UTF-8">
        <title>Henkilöpalvelin</title>
    </head>
    <body>
    `;

const htmlLoppu =`
</body>
</html>`;

// lähetä etusivun valikko (sallittujen osoitteiden lista)
function lahetaValikko(res) {
    res.writeHead(200, {'Content-Type':'text/html'});
    res.write(htmlAlku);
    res.write(`<h2>Tällä palvelimella voi käyttää seuraavia tiedostopolkuja</h2>
    <p>/kaikki - hae kaikki</p>
    <p>/hae?nimi=henkilonimi - hae nimellä</p>
    <p>/hae?ammatti=henkiloammatti - hae ammatilla</p>
    <p>/poista?nimi=henkilonimi - poista henkilö</p>`);
    res.write(htmlLoppu);
    res.end();
}

// lähetä yhden tai useamman henkilön tiedot
function lahetaHenkilot(res, henkilot) {
    res.writeHead(200, {'Content-Type':'text/html'});
    res.write(htmlAlku);
    if(henkilot == null || henkilot.length == 0) {
        res.write('<p>Ei henkilöitä.</p>')
    }
    
    else {
        res.write(`<table>
        <tr>
            <th>Nimi</th>
            <th>Ikä</th>
            <th>Ammatti</th>
        </tr>
        `);
        // henkilöitä on monta, käsittele taulukko
        if(Array.isArray(henkilot)) {
            for (let henkilo of henkilot) {
                res.write(`<tr>
                    <td>${henkilo.nimi}</td>
                    <td>${henkilo.ika}</td>
                    <td>${henkilo.ammatti}</td>
                </tr>`);
            }
        }
        // henkilöitä on vain yksi
        else {
            res.write(`<tr>
                <td>${henkilot.nimi}</td>
                <td>${henkilot.ika}</td>
                <td>${henkilot.ammatti}</td>
            </tr>`);
        }
        res.write('</table>');
    }
    res.write(htmlLoppu);
    res.end();
}

function lahetaLisaysilmoitus(res, henkilo) {
    if(henkilo == null) {
        lahetaVirhe(res, 'Henkilö ei lisätty');
    }
    else {
        res.writeHead(200, {'Content-Type':'text/html'});
        res.write(htmlAlku);
        res.write(`<p>Henkilöä ei lisätty.</p>`);
        res.write(htmlLoppu);
        res.end();
    }
}

// lähetä ilmoitus, että henkilön poistaminen onnistui tai ei onnistunut
function lahetaPoistoilmoitus(res, henkilo) {
    if(henkilo == null) {
        lahetaVirhe(res, 'Poistettavaa henkilöä ei ole olemassa.')
    }
    else {
        res.writeHead(200, {'Content-Type':'text/html'});
        res.write(htmlAlku);
        res.write(`<p>Henkilö ${henkilo.nimi} on poistettu.</p>`);
        res.write(htmlLoppu);
        res.end();
    }
}

function muokkausIlmoitus(res, henkilo) {
    if(henkilo == null) {
        lahetaVirhe(res, 'Muokattavaa henkilö ei ole olemassa');
    }
    else {
        res.writeHead(200, {'Content-Type':'text/html'});
        res.write(htmlAlku);
        res.write(`<p>Henkilö ${henkilo.nimi} on muokattu.</p>`);
        res.write(htmlLoppu);
        res.end();
    }
}



// lähetä 404-virheilmoitus
function lahetaVirhe(res, viesti) {
    // tämä tekee itse asiassa saman asian kuin statuskoodin asettaminen, mutta asettaa myös sisällön tyypin
    res.writeHead(404, {'Content-Type':'text/html'});
    res.end(`${htmlAlku}<p>${viesti}</p>${htmlLoppu}`);
}

module.exports = { lahetaValikko, lahetaHenkilot, lahetaPoistoilmoitus, lahetaVirhe, muokkausIlmoitus, lahetaLisaysilmoitus };