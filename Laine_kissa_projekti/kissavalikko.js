'use strict';
 
const lue = require('./kirjasto/syotekirjasto');
 
const Tietovarasto = require('./jsonvarasto/tietovarastokerros');
 
const varasto = new Tietovarasto();
 
const valikkoTeksti = `
Valitse:
 
1: hae kaikki kissat
2: hae kissa
3: lisää kissa
4: poista kissa
5: muuta kissan tietoja
6: lopeta
 
Anna valintasi (1, 2, 3, 4, 5 tai 6): `;
 
const virheilmoitus = `
###############################
Anna numero 1, 2, 3, 4, 5 tai 6
###############################`;
 
const lopputeksti = `
##############################################
Kiitos, että käytit huippuhienoa sovellustamme
##############################################
`
 
valikko();
 
async function valikko() {
    let onLoppu = false;
    do {
        const valinta = await lue(valikkoTeksti);
        if (valinta === '1') {
            await haeKaikkiKissat();
        }
        else if (valinta === '2') {
            await haeYksiKissa();
        }
        else if (valinta === '3') {
            await lisaaKissa();
        }
        else if (valinta === '4') {
            await poistaKissa();
        }
        else if (valinta === '5') {
            await paivitaKissa();
        }
        else if (valinta === '6') {
            console.log(lopputeksti);
            onLoppu = true;
        }
        else {
            console.log(virheilmoitus);
        }
    } while (!onLoppu);
}



 
async function lueKissanTiedot() {
    const numero = +await lue('Anna numero: ');
    const nimi = await lue('Nimi: ')
    const syntymavuosi = await lue('Syntymävuosi:');
    const rotu = await lue('Rotu: ');
    const painoKg = +await lue('Paino: ');
 
    return {
        numero,
        nimi,
        syntymavuosi,
        rotu,
        painoKg
    };
}
function muodostaStatusviesti(viesti) {
    return `\n########### Status ##########\n${viesti}`;
}
async function haeKaikkiKissat(){
    console.log('\n####### kaikki kissat ########');
    console.log('\n| numero | nimi | syntymavuosi | rotu | painoKg |\n');
    
    for(const kissa of await varasto.haeKaikki()){
        console.log(kissaRivi(kissa));
    }  
}

function kissaRivi(kissa){
    return `| ${kissa.numero} | ${kissa.nimi} | ${kissa.syntymavuosi} | ${kissa.rotu} | ${kissa.painoKg} | \n`
}

function kissaRivi2(kissa){
    return `
    numero: ${kissa.numero} 

    nimi: ${kissa.nimi} 

    syntymavuosi: ${kissa.syntymavuosi}

    rotu: ${kissa.rotu} 

    painoKg: ${kissa.painoKg} `
}
 
async function haeYksiKissa(){
    try{
        const numero = +await lue('Anna numero: ');
        const tulos = await varasto.hae(numero);
        console.log('\n######## hae kissa ########')
        console.log(kissaRivi2(tulos));
    }
    catch(virhe){
        console.log(muodostaStatusviesti(virhe.viesti));
    }
}
async function lisaaKissa() {
    try {
        const uusi = await lueKissanTiedot();
        const tulos = await varasto.lisaa(uusi);
        console.log(muodostaStatusviesti(tulos.viesti));
    }
    catch (virhe) {
        console.log(muodostaStatusviesti(virhe.viesti));
    }

}

async function poistaKissa(){
    try{
        const numero= +await lue('Anna numero: ');
        const status=await varasto.poista(numero);
        console.log(muodostaStatusviesti(status.viesti));
    }
    catch(virhe){
        console.log(muodostaStatusviesti(virhe.viesti));
    }
}

async function paivitaKissa() {
    try {
        const muutettu = await lueKissanTiedot();
        const tulos = await varasto.paivita(muutettu);
        console.log(muodostaStatusviesti(tulos.viesti));
    }
    catch (virhe) {
        console.log(muodostaStatusviesti(virhe.viesti));
    }
}

