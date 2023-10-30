'use strict';
 
console.log('Hei');
 
let a=8;
const b=8;
 
console.log('summa=',a+b);
 
let mjono=`summa= ${a+b}`;
 
console.log(mjono);
a=12;
 
if(a>10) {
    console.log('yli 10')
}
else if(a<10){
    console.log('alle 10');
}
else {
    console.log('10');
}
 
for (let i = 0, k=10; i<10; i++,k-=2) {
    console.log(i,k);
}