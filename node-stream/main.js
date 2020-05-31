const RandomStream = require('./readableStream');
const randomStream = new RandomStream();
//randomStream._read = function(m){

//}
randomStream.push('random zzz');
randomStream.on('readable',()=>{
    let chunk;
    console.log(`readable`);
    randomStream.kok();
    while((chunk = randomStream.read()) !== null){
        console.log(`Chunk received :  ${chunk.toString()}`);
    }
});