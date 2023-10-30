'use strict';
 
const {STATUSKOODIT, STATUSVIESTIT} = require('./statuskoodit');
const {
    haeKaikkiVarastosta,
    haeYksiVarastosta,
    lisaaVarastoon,
    poistaVarastosta,
    paivitaVarasto
} = require('./varastoapufunktiot');
 
 
 
//Tietovarastoluokka
 
module.exports = class Tietovarasto{
 
    get STATUSKOODIT(){
        return STATUSKOODIT;
    };
 
    lisaa(uusi){
        return new Promise(async (resolve, reject)=>{
            if(uusi) {
                if(!uusi.numero){
                    reject(STATUSVIESTIT.EI_LISATTY());
                }
                else if (await haeYksiVarastosta(uusi.numero)){
                    reject(STATUSVIESTIT.JO_KAYTOSSA(uusi.numero))
                }
                else if(await lisaaVarastoon(uusi)){
                    resolve(STATUSVIESTIT.LISAYS_OK(uusi.numero));
                }
                else {
                    reject(STATUSVIESTIT.EI_LISATTY());
                }
            }
            else {
                reject(STATUSVIESTIT.EI_LISATTY());
            }
        });
    }//lisaa loppu
    
    haeKaikki(){
        return haeKaikkiVarastosta();
    } //haeKaikki loppu


    hae(numero){
        return new Promise(async (resolve,reject)=>{
            if(!numero){
                reject(STATUSVIESTIT.EI_LOYTYNYT('<tyhjä>'));
            }
            else{
                const tulos = await haeYksiVarastosta(numero);
                if(tulos){
                    resolve(tulos);
                }
                else {
                    reject(STATUSVIESTIT.EI_LOYTYNYT(numero));
                }
            }
        });
    } //hae loppu

    poista(numero){
        return new Promise(async (resolve,reject)=>{
            if (!numero) {  //numero nolla menee myös tänne
                reject(STATUSVIESTIT.EI_LOYTYNYT('<tyhjä>'));
            }
            else if(await poistaVarastosta(numero)){
                resolve(STATUSVIESTIT.POISTO_OK(numero));
            }
            else {
                reject(STATUSVIESTIT.EI_POISTETTU());
            }
        });
    }// poista loppu

    paivita(muutettuOlio) {
        return new Promise(async (resolve,reject)=>{
            if(muutettuOlio){
                if(await paivitaVarasto(muutettuOlio)){
                    resolve(STATUSVIESTIT.PAIVITYS_OK(muutettuOlio.numero));
                }
                else{
                    reject(STATUSVIESTIT.EI_PAIVITETTY());
                }
            }
            else {
                reject(STATUSVIESTIT.EI_PAIVITETTY());
            }
        });
    } //paivitys loppu



} //luokan loppu
 