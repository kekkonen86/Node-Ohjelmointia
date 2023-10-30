'use strict';
 
const autot=require('./autot.json');
 
console.log(autot[0].merkki);
console.log(autot[1].merkki);
 
console.log('##################');
for(let i=0; i<autot.length;i++){
    console.log(autot[i].merkki, autot[i].rekisteri);
}
console.log('##################');
for(let auto of autot){
    console.log(auto.merkki, auto.rekisteri);
}
 
console.log('###### Hopat #####');
for(let auto of autot){
    if(auto.merkki==='Hoppa') {
        console.log(auto.rekisteri);
    }
}
 
console.log('###### Hopat 2 #####');
for (let auto of autot) {
    if (auto.merkki.toLowerCase() === 'hoppa') {
        console.log(auto.rekisteri);
    }
}
 
console.log('###### Hopat 3 #####');
let haettava='kaara';
for (let auto of autot) {
    if (auto.merkki.toLowerCase() === haettava) {
        console.log(auto.rekisteri);
    }
}
 
function haeMerkilla(haettava){
    for(let auto of autot){
        if(auto.merkki.toLowerCase()===haettava){
            console.log(auto.rekisteri);
        }
    }
}
console.log('######### funktio hakee hopat #######');
haeMerkilla('hoppa');
console.log('######## functio hakee kaarat ######');
haeMerkilla('kaara');
 
function haeRekisterinumerot(merkki){
    const loydetyt=[];
    for(let auto of autot){
        if(auto.merkki.toLowerCase()===merkki){
            loydetyt.push(auto.rekisteri);
        }
    }
    return loydetyt;
}
 
console.log('#### raakatulostus ####');
console.log(haeRekisterinumerot('hoppa'));
console.log(haeRekisterinumerot('xoppax'));
 
console.log('####### toistorakenteella #####');
for(let alkio of haeRekisterinumerot('hoppa')){
    console.log(alkio);
}
console.log('#### kaarat ####');
const haetut=haeRekisterinumerot('kaara');
for(let alkio of haetut){
    console.log(alkio);
}