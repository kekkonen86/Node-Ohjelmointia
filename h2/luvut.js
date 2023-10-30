
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


rl.question('Anna luku 1 ', function (l1) {
    rl.question('Anna luku 2 ', function (l2) {
        let luku1 = Number(l1);
        let luku2 = Number(l2);
        summa = luku1 + luku2;
        erotus = luku1 - luku2;
        tulo = luku1 * luku2;
        osamaara = luku1 / luku2;
        let text = "";
        let tule = 0;

        if (luku1 > 10 || luku1 < 1 || luku2 > 10 || luku2 < 1) {
            console.log(`${"Numerot ei ole luvuilta 1-10"}`)    
            rl.close();
          }

        console.log(`${summa}`)  
        console.log(`${erotus}`)  
        console.log(`${tulo}`)  
        console.log(`${osamaara}`)  



        let suurempi = luku1 > luku2

        if (suurempi == true) {
            tule = luku2
            while (tule <= luku1) {
              text += tule + " "
              tule = tule+1
            }
            console.log(`${text}`)  

          }
        
          if (suurempi == false) {
            tule = luku1
            while (tule <= luku2) {
              text += tule + " "
              tule= tule+1
            }
            console.log(`${text}`)  

          }


        rl.close();
  });
});

rl.on('close', function () {
  console.log('\nPROSESSI LOPETETTU');
  process.exit(0);
});