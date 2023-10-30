'use strict';
 
const autot = require('./autot.json');
 
function hae(rekisterinumero){
    const isoina=rekisterinumero.toUpperCase();
    for(let auto of autot){
        if(auto.rekisteri===isoina){
            return auto;
        }
    }
    return null;
}
 
function haeMerkillä(merkki){
    const loydetyt=[];
    for(let auto of autot){
        if(auto.merkki===merkki) {
            loydetyt.push(auto);
        }
    }
    return loydetyt;
}
 
module.exports={hae, haeMerkillä}
 
// console.log(hae('abc-1'));
// console.log(haeMerkillä('Hoppa'));
 