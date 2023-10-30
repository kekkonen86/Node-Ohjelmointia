'use strict';
 
const {STATUSKOODIT, STATUSVIESTIT} = require('./statuskoodit');
 
const {
    haeYksiVarastosta,
    lisaaVarastoon    
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
 
} //luokan loppu