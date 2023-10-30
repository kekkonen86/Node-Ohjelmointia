'use strict';
const { hae, haeMerkillä }=require('./autofunktiot.js');

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});



rl.question('Anna auton merkki ', function (auto) {
       console.log(haeMerkillä(auto));
        rl.question('Anna auton rekisterinumero ', function (rekkari) {
          let rek = rekkari;
          if (hae(rek) == null) {
            console.log("Autoa ei löydy");
          } else {
            console.log(hae(rek));
          }

    

          rl.close();
        });
    
        

        // console.log(haeMerkillä('Kaara'));
        
        // rl.question('Anna auton rekisteri ', function (rek) {
          
        // });
      

      
      
    });
  
  
  
