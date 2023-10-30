const fs=require('fs');
const path = require('path');
// tuodaan tarvittava util-moduuli
const util = require('util');

const tiedostopolku = path.join(__dirname,'testi.txt');

// luodaan uusi muuttuja lupauksiin perustuvaa funktiotamme varten
const readFile = util.promisify(fs.readFile);

// huomaa, että tämä on readFile eli uusi lupauksiin perustuva funktiomme, ei alkuperäinen fs.readFile
readFile(tiedostopolku, 'utf8')
    .then((data) => console.log(data))   // jos lukeminen onnistui, tulostetaan data
    .catch((err) => console.log(err));   // jos tuli virhe, tulostetaan virheilmoitus