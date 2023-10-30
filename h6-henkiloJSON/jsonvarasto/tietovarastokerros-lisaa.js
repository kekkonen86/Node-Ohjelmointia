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
                if(!uusi.id){
                    reject(STATUSVIESTIT.EI_LISATTY());
                }
                else if (await haeYksiVarastosta(uusi.id)){
                    reject(STATUSVIESTIT.JO_KAYTOSSA(uusi.id))
                }
                else if(await lisaaVarastoon(uusi)){
                    resolve(STATUSVIESTIT.LISAYS_OK(uusi.id));
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