'use strict';
 
module.exports = viesti =>{
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