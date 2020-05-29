const fs = require('fs');
const combine = require('multipipe');

fs.createReadStream('./src.txt')
.on('data',chunk=>{
    console.log('chunk is ',chunk.toString());
})
.on('end',()=>{
    console.log('end');

});



//파이프에서 발생한 이벤트는 전파X
fs.createReadStream('./src.txt')
.pipe(fs.createWriteStream('./dest.txt'))
.on('data',chunk=>{
    console.log('end ',chunk.toString());

});;
