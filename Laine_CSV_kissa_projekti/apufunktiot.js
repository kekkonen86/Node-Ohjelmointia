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
 
1: hae kaikki kissat
2: hae yksi kissa
3: lisää kissa
4: päivitä kissan tietoja
5: poista kissa
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
 
function muodostaKissaRivi(kissa){
    return  ` | ${kissa.numero} | ${kissa.nimi} | ${kissa.painoKg} | ` +
            ` | ${kissa.syntymavuosi} | ${kissa.rotu} | `;
}

function muodostaKissaRivi2(kissa){
    return  `  
    numero: ${kissa.numero} 
    
    nimi: ${kissa.nimi}  

    painoKg: ${kissa.painoKg} 

    syntymävuosi: ${kissa.syntymavuosi}  
    
    rotu: ${kissa.rotu}  `;
}

function muodostaStatusviesti(statusolio){
    const viesti=`
    ########### Status (${statusolio.tyyppi}) ############
    ${statusolio.viesti}
    ${'#'.repeat(statusolio.viesti.length)}`;
    return viesti;
}
 
async function lueKissanTiedot(){
    const numero = +await lue('Anna numero: ');
    const nimi = await lue('Anna nimi: ');
    const painoKg = await lue('Anna painoKg: ');
    const syntymavuosi = await lue('Anna syntymavuosi: ');
    const rotu = await lue('Anna rotu: ');
 
    return {
        numero,
        nimi,
        painoKg,
        syntymavuosi,
        rotu
    };
}
 
async function haeKaikkiKissat(){
    tulosta('\n###### kaikki kissat ######\n')
    tulosta('\n| numero | nimi | painoKg |  | syntymävuosi | rotu | \n')
    for(let kissa of await varasto.haeKaikki()){
        tulosta(muodostaKissaRivi(kissa));
    }
}
 
async function haeYksiKissa(){
    try{
        const numero = +await lue('Anna numero: ');
        const kissa = await varasto.hae(numero);
        tulosta('\n##### hae kissa #####\n');
        tulosta(muodostaKissaRivi2(kissa));
    }
    catch(virhe){
        tulosta(muodostaStatusviesti(virhe));
    }
}
 
async function lisaaKissa(){
    try{
        const uusi = await lueKissanTiedot();
        const status = await varasto.lisaa(uusi);
        tulosta(muodostaStatusviesti(status));
    }
    catch(virhe){
        tulosta(muodostaStatusviesti(virhe));
    }
}
 
async function paivitaKissa(){
    try{
        const muutettu=await lueKissanTiedot();
        const status= await varasto.paivita(muutettu);
        tulosta(muodostaStatusviesti(status));
    }
    catch(virhe){
        tulosta(muodostaStatusviesti(virhe));
    }
}
 
async function poistaKissa(){
    try{
        const numero= +await lue('Anna numero: ');
        const status = await varasto.poista(numero);
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
    haeKaikkiKissat,
    haeYksiKissa,
    lisaaKissa,
    paivitaKissa,
    poistaKissa,
    tulostaLopputekstit,
    tulostaVirhe
};