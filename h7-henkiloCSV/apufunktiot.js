'use strict';
 
const path = require('path');
 
const { lue, tulosta } = require('./kirjasto/syotekirjasto.js');
 
const {aktiivinenvarasto} =require('./config.json');
 
const Tietovarasto=
    require(path.join(__dirname,aktiivinenvarasto,'tietovarastokerros'));
 
//luodaan tietovarasto-olio
const varasto = new Tietovarasto();


 
const valikkoTeksti = `
Valitse:
 
1: hae kaikki henkilöt
2: hae henkilö
3: lisää henkilö
4: muuta henkilön tietoja
5: poista henkilö
6: lopeta
 
Anna valintasi (1, 2, 3, 4, 5 tai 6): `;
 
const lopputeksti=`
############################################
Kiitos, että käytit huippuhienoa ohjelmaamme
############################################`;
 
const virheilmoitus=`
###############################
Anna numero 1, 2, 3, 4, 5 tai 6
###############################`;
 
async function lueValinta(){
    return await lue(valikkoTeksti);
}
 
function muodostaHenkiloRivi(henkilo){
    return  `${henkilo.id}: ${henkilo.etunimi} ${henkilo.sukunimi}, `+
            `${henkilo.osasto} (palkka: ${henkilo.palkka} €)`;
}
 
function muodostaStatusviesti(statusolio){
    const viesti=`
    ########### Status (${statusolio.tyyppi}) ############
    ${statusolio.viesti}
    ${'#'.repeat(statusolio.viesti.length)}`;
    return viesti;
}
 
async function lueHenkilonTiedot(){
    const id = +await lue('Anna id: ');
    const etunimi = await lue('Anna etunimi: ');
    const sukunimi = await lue('Anna sukunimi: ');
    const osasto = await lue('Anna osasto: ');
    const palkka = +await lue('Anna palkka: ');
 
    return {
        id,
        etunimi,
        sukunimi,
        osasto,
        palkka
    };
}
 
async function haeKaikkiHenkilot(){
    tulosta('\n###### kaikki henkilöt ######\n')
    for(let henkilo of await varasto.haeKaikki()){
        tulosta(muodostaHenkiloRivi(henkilo));
    }
}
 
async function haeYksiHenkilo(){
    try{
        const id = +await lue('Anna id: ');
        const henkilo = await varasto.hae(id);
        tulosta('\n##### hae henkilö #####\n');
        tulosta(muodostaHenkiloRivi(henkilo));
    }
    catch(virhe){
        tulosta(muodostaStatusviesti(virhe));
    }
}
 
async function lisaaHenkilo(){
    try{
        const uusi = await lueHenkilonTiedot();
        const status = await varasto.lisaa(uusi);
        tulosta(muodostaStatusviesti(status));
    }
    catch(virhe){
        tulosta(muodostaStatusviesti(virhe));
    }
}
 
async function paivitaHenkilo(){
    try{
        const muutettu=await lueHenkilonTiedot();
        const status= await varasto.paivita(muutettu);
        tulosta(muodostaStatusviesti(status));
    }
    catch(virhe){
        tulosta(muodostaStatusviesti(virhe));
    }
}
 
async function poistaHenkilo(){
    try{
        const id= +await lue('Anna id: ');
        const status = await varasto.poista(id);
        tulosta(muodostaStatusviesti(status));
    }
    catch(virhe){
        tulosta(muodostaStatusviesti(virhe));
    }
 
}
 
function tulostaLopputekstit(){
    tulosta(lopputeksti);
}
 
function tulostaVirhe(){
    tulosta(virheilmoitus);
}
 
module.exports = {
    lueValinta,
    haeKaikkiHenkilot,
    haeYksiHenkilo,
    lisaaHenkilo,
    paivitaHenkilo,
    poistaHenkilo,
    tulostaLopputekstit,
    tulostaVirhe
};