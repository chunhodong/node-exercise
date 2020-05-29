const fromArray = require('from2-array');
const through = require('through2');
const fs = require('fs');

const concatFiles = (destinations,files,callback) => {

    const destSream = fs.createWriteStream(destinations);

    //배열로부터 readable스트림을 만듬
    fromArray.obj(files)
    .pipe(through.obj((file,enc,done)=>{
        console.log('file is : ',file);
        const src = fs.createReadStream(file);
        src.pipe(destSream,{end:false});
        src.on('end',done);
    }))
    .on('finish',()=>{
        destSream.end();
        callback();
    });
}
module.exports = concatFiles;
