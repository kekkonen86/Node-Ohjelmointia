'use strict';
 
let henkilo=require('./henkilo.json');
 
console.log(henkilo.etunimi);
console.log(henkilo.sukunimi);
console.log(henkilo.ikä);
 
console.log(henkilo.etunimi, henkilo.ikä+1);
 
console.log(`Nimeni on ${henkilo.sukunimi}, ${henkilo.etunimi} ${henkilo.sukunimi}`);
henkilo.ikä=30;
console.log(henkilo.ikä);
 
console.log(henkilo);
henkilo={}
console.log(henkilo);
 
const uusiHenkilo={
    etunimi:'Matti',
    sukunimi:'Puro',
    ikä:20
};
 
console.log(uusiHenkilo);