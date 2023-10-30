'use strict';
 
const lue = viesti =>{
    process.stdout.write(viesti);
    return new Promise(resolve=>{
        const syote=process.stdin;
        syote.resume();
        syote.once('data', data=>{
            syote.pause();
            resolve(data.toString().trim());
        });
    });
};
 
const tulosta = viesti => console.log(viesti);
 
module.exports={lue,tulosta};