'use strict';
 
const path = require('path');
 
const {jsontiedosto} = require('./varastoConfig.json');
 
const varastoTiedosto=path.join(__dirname,jsontiedosto);
const {
    lueVarasto,
    kirjoitaVarasto
} = require('./varastokasittelija');
 

async function haeKaikkiVarastosta() {
    return lueVarasto(varastoTiedosto);
}

async function haeYksiVarastosta(numero){
    return (await lueVarasto(varastoTiedosto))
        .find(olio=>olio.numero==numero) || null;
}
 
async function lisaaVarastoon(uusiOlio) {
    const varasto = await lueVarasto(varastoTiedosto);
    varasto.push(uusiOlio);
    return await kirjoitaVarasto(varastoTiedosto,varasto);


}

async function paivitaVarasto(olio){
    const varasto = await lueVarasto(varastoTiedosto);
    const vanhaOlio=varasto.find(vanha=>vanha.numero==olio.numero);
    if(vanhaOlio) {
        Object.assign(vanhaOlio, olio);
        return await kirjoitaVarasto(varastoTiedosto, varasto);
    }
    return false;
}

async function poistaVarastosta(numero){
    const varasto = await lueVarasto(varastoTiedosto);
    const i = varasto.findIndex(alkio=>alkio.numero==numero);
    if(i<0) return false;
    varasto.splice(i, 1);
    return await kirjoitaVarasto(varastoTiedosto, varasto);
}

module.exports={
    haeKaikkiVarastosta,
    haeYksiVarastosta,
    lisaaVarastoon,
    poistaVarastosta,
    paivitaVarasto
};