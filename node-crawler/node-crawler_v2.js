const request = require('request');
const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const utilities = require('./utilities');

/**
 * @description 
 * _v0에서 재사용가능한 모듈추출후 함수로 만들기
 * return callback형식으로 중첩구문줄이기
 */

const spider = (url,nesting,callback) => {
    //url추출
    const filename = utilities.urlToFilename(url);

    //문서파일존재하는지 확인
    fs.readFile(filename, 'utf8', (err, body) => {
        if (err) {
            if (err.code !== 'ENOENT') {
                return callback(err);
            }

            return download(url, filename, (err, body) => {
                if (err) {
                    return callback(err);
                }
                spiderLink(url, body, nesting, callback);
            });
        }
        spiderLink(url,body,nesting,callback);
    });
}

const saveFile = (filename, content, callback) => {
    mkdirp(path.dirname(filename), err => {
        if (err) {
            return callback(err);
        }
        fs.writeFile(filename, content,'utf8',callback);
    });
}

const download = (url, filename, callback) => {
    console.log(`Downloading ${url}`);
    request(url, (err, response, body) => {
        if (err) {
            return callback(err);
        }
        saveFile(filename, body, err => {
            if (err) {
                return callback(err);
            }
            console.log(`Downloaded and saved ${url}`);
            callback(null, body);

        });
    });
}

const spiderLink = (currentUrl,body,nesting,callback) => {
    if(nesting === 0){
        return process.nextTick(callback);
    }
    //페이지에 포함된 링크추출
    const link = utilities.getPageLinks(currentUrl,body);
    
    function iterate(index){
        if(index === link.length){
            return callback();
        }
        spider(link[index],nesting - 1,err=>{
            if(err){
                return callback(err);
            }
            iterate(index + 1);
        });
    }
    iterate(0);

}
module.exports = { spider }