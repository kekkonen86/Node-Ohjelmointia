let henkilot = require('./henkilot.json')

// palauttaa kaikkihenkilöt
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

// palauttaa taulukon henkilöitä
function haeAmmatilla(ammatti) {
    let henkilotaulukko = [];
    for(let henkilo of henkilot) {
        if(henkilo.ammatti.toLowerCase() == ammatti.toLowerCase()) {
            henkilotaulukko.push(henkilo);
        }

    }
    return henkilotaulukko;
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


module.exports = {haeKaikki, haeNimella, haeAmmatilla, poistaHenkilo};