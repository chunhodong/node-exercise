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

const spider = (url,callback) => {
    //url추출
    const filename = utilities.urlToFilename(url);
    
    //문서파일존재하는지 확인
    fs.exists(filename,exists =>{
        
        if(exists){
            return callback(null,filename,false);

        }
        //존재하지 않으면 다운로드 후 파일로 저장
        download(url,filename,err=>{
            if(err){
                return callback(err);
            }
            callback(null,filename,true);
        });
    });
}

const saveFile = (filename,content,callback) => {
    mkdirp(path.dirname(filename),err =>{
        if(err){
            return callback(err);
        }
        fs.writeFile(filename,content,callback);
    });
}

const download = (url,filename,callback) => {
    console.log(`Downloading ${url}`);
    request(url,(err,response,body)=>{
        if(err){
            return callback(err);
        }
        saveFile(filename,body,err=>{
            if(err){
                return callback(err);
            }
            console.log(`Downloaded and saved ${url}`);
            callback(null,body);

        });
    });
}

module.exports = {spider}