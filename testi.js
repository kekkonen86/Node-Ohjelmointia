'use strict';
const henkilo={
    etunimi:'Leila',
    sukunimi:'Hökki',
    puhelin:'040123456'
};
console.log(henkilo.etunimi);
console.log(henkilo.sukunimi);
console.log(henkilo['puhelin']);
console.log(henkilo.puhelin);
console.log(
    `Nimeni on ${henkilo.sukunimi}, ${henkilo.etunimi} ${henkilo.sukunimi}`);