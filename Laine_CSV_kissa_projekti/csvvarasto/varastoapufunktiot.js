'use strict';
 
const path = require('path');
 
const { varastotiedosto } = require('./varastoConfig.json');
 
const varastoTiedostoPolku = path.join(__dirname,varastotiedosto);
 
const { lueVarasto, kirjoitaVarasto } = require('./varastokasittelija');
 
async function haeKaikkiVarastosta(){
    return lueVarasto(varastoTiedostoPolku);
}
 
async function haeYksiVarastosta(numero){
    return (await lueVarasto(varastoTiedostoPolku)).find(olio=>olio.numero==numero) || null;
}
 
async function lisaaVarastoon(uusiOlio){
    const varasto = await lueVarasto(varastoTiedostoPolku);
    varasto.push(uusiOlio);
    return await kirjoitaVarasto(varastoTiedostoPolku,varasto);
}
 
async function paivitaVarasto(olio){
    const varasto = await lueVarasto(varastoTiedostoPolku);
    const vanhaOlio = varasto.find(vanha=>vanha.numero==olio.numero);
    if(vanhaOlio) {
        Object.assign(vanhaOlio,olio);
        return await kirjoitaVarasto(varastoTiedostoPolku,varasto);
    }
    return false;
}
 
async function poistaVarastosta(numero){
    const varasto = await lueVarasto(varastoTiedostoPolku);
    const i = varasto.findIndex(alkio=>alkio.numero==numero);
    if(i<0) return false;
    varasto.splice(i,1);
    return await kirjoitaVarasto(varastoTiedostoPolku, varasto);
}
 
module.exports={
    haeKaikkiVarastosta, 
    haeYksiVarastosta,
    lisaaVarastoon,
    paivitaVarasto,
    poistaVarastosta
};