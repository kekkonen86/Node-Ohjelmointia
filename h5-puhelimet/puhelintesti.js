'use strict';

const readline = require('readline');
const rekisteri=require('./puhelimet.json');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


// for(let henkilo of rekisteri){
//     for(let puhelin of henkilo.puhelimet){
//     }
// }
 
function haeNumerot(etunimi, sukunimi) {
    for(let henkilo of rekisteri) {
        if(henkilo.etunimi === etunimi && henkilo.sukunimi === sukunimi) {
            console.log(`${henkilo.etunimi} ${henkilo.sukunimi}: ${henkilo.puhelimet}`);
        }
    }
}

rl.question('Anna nimi ja sukunimi: ', function (nimi) {
  const kokonimi = nimi.split(" ");
  haeNumerot(kokonimi[0], kokonimi[1]);
  rl.close();
});
    
    






