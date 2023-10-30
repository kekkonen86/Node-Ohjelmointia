'use strict';
 
const lue = require('./kirjasto/syotekirjasto');
 
// lue('Anna nimi:').then(console.log);
 
async function testi(){
    const etunimi= await lue('Anna numero: ');
    const sukunimi= await lue('Nimi: ');
    console.log(`${numero} ${nimi}`);
}
 
testi();