const STATUSKOODIT = {
    OHJELMAVIRHE: 0,
    EI_LOYTYNYT: 1,
    LISAYS_OK: 2,
    EI_LISATTY:3,
    JO_KAYTOSSA:4,
    PAIVITYS_OK:5,
    EI_PAIVITETTY:6,
    POISTO_OK:7,
    EI_POISTETTU:8 
};
 
const STATUSVIESTIT = {
    OHJELMAVIRHE: () => ({
        viesti: 'Anteeksi! Ohjelmassamme oli virhe',
        statuskoodi: STATUSKOODIT.OHJELMAVIRHE,
        tyyppi: 'virhe'
    }),
    EI_LOYTYNYT: numero => ({
        viesti: `Annetulla numerolla ${numero} ei löytynyt tietoja`,
        statuskoodi: STATUSKOODIT.EI_LOYTYNYT,
        tyyppi: 'virhe'
    }),
    LISAYS_OK: numero => ({
        viesti: `Tieto numerolla ${numero} lisätiin`,
        statuskoodi: STATUSKOODIT.LISAYS_OK,
        tyyppi: 'info'
    }),
    EI_LISATTY: ()=>({
        viesti:'Tietoja ei lisätty',
        statuskoodi:STATUSKOODIT.EI_LISATTY,
        tyyppi:'virhe'
    }),
    JO_KAYTOSSA: numero=>({
        viesti:`Numero ${numero} oli jo käytössä`,
        statuskoodi:STATUSKOODIT.JO_KAYTOSSA,
        tyyppi:'virhe'
    }),
    PAIVITYS_OK: numero=>({
        viesti:`Tiedot numerolla ${numero} päivitettiin`,
        statuskoodi:STATUSKOODIT.PAIVITYS_OK,
        tyyppi:'info'
    }),
    EI_PAIVITETTY: ()=>({
        viesti: 'Tietoja ei muutettu',
        statuskoodi:STATUSKOODIT.EI_PAIVITETTY,
        tyyppi:'virhe'
    }),
    POISTO_OK: numero=>({
        viesti:`Tieto numerolla ${numero} poistettiin`,
        statuskoodi:STATUSKOODIT.POISTO_OK,
        tyyppi:'info'
    }),
    EI_POISTETTU: numero =>({
        viesti:`Annetulla numerolla ${numero} ei löytynyt tietoja. Mitään ei poistettu`,
        statuskoodi:STATUSKOODIT.EI_POISTETTU,
        tyyppi:'virhe'
    })  
};
 
module.exports={STATUSKOODIT,STATUSVIESTIT};