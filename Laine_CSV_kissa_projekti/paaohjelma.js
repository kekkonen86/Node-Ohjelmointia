'use strict';
 
const { 
    lueValinta,
    haeKaikkiKissat,
    haeYksiKissa,
    lisaaKissa,
    paivitaKissa,
    poistaKissa,
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
                await haeKaikkiKissat();
                break;
            case '2':
                await haeYksiKissa();
                break;
            case '3':
                await lisaaKissa();
                break;
            case '4':
                await paivitaKissa();
                break;
            case '5':
                await poistaKissa();
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