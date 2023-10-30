let henkilot = require('./henkilot.json')
// palauttaa kaikkihenkilöt
var stringified = JSON.stringify(henkilot);
stringified = stringified.replace('"nimi": "homo"', '"syntymapaikka": "homo"', '"taito": "homo"');
var jsonObject = JSON.parse(stringified);



function haeKaikki() {
    return henkilot;
}

// palauttaa yhden henkilön
function haeNimella(nimi) {
    for(let henkilo of henkilot) {
        if(henkilo.nimi.toLowerCase() == nimi.toLowerCase()) {
            return henkilo;
        }
    }
    return null;
}

// lisaa yhden henkilön
function lisaaYksi(nimi, synnyinpaikka, taito){
    const uusiOlio = {
        nimi: nimi,
        synnyinpaikka: synnyinpaikka,
        taito: taito
    }
    henkilot.push(uusiOlio)
}

// poistaa ja palauttaa yhden henkilön
function poistaHenkilo(nimi) {
    for(let henkilo of henkilot) {
        if(henkilo.nimi.toLowerCase() == nimi.toLowerCase()) {
            poistettava = henkilo;
        }

    }
    let indeksi = henkilot.indexOf(poistettava);
    henkilot.splice(indeksi, 1);
    return poistettava;
}

// muokkaa yhden henkilön tietoja
function muokkaaYksi(nimi) {
    for(let henkilo of henkilot) {
        if(henkilo.nimi.toLowerCase() == nimi.toLowerCase()) {
            muokattava = henkilo;
        }

    }
    let indeksi = henkilot.indexOf(muokattava);
    henkilot.splice(indeksi, 1, {"nimi":"LOL","synnyinpaikka":"LOL","taito":"LOL"});
    return muokattava;
}

module.exports = {haeKaikki, haeNimella, poistaHenkilo, lisaaYksi, muokkaaYksi};