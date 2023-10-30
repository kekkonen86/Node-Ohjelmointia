'use strict';
 
const { 
    lueValinta,
    haeKaikkiHenkilot,
    haeYksiHenkilo,
    lisaaHenkilo,
    paivitaHenkilo,
    poistaHenkilo,
    tulostaLopputekstit,
    tulostaVirhe
} = require('./apufunktiot');
 
naytaValikko();
 
async function naytaValikko(){
    let onLoppu=false;
    do{
        const valinta = await lueValinta();
        switch(valinta){
            case '1':
                await haeKaikkiHenkilot();
                break;
            case '2':
                await haeYksiHenkilo();
                break;
            case '3':
                await lisaaHenkilo();
                break;
            case '4':
                await paivitaHenkilo();
                break;
            case '5':
                await poistaHenkilo();
                break;
            case '6':
                onLoppu=true;
                tulostaLopputekstit();
                break;
            default:
               tulostaVirhe()
        }
    } while(!onLoppu);  
}