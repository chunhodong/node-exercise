const request = require('request');
const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const utilities = require('./utilities');

const spider = (url,callback) => {
    //url추출
    const filename = utilities.urlToFilename(url);
    
    //문서파일존재하는지 확인
    fs.exists(filename,exists =>{

        //존재하지 않으면 request요청
        if(!exists){
            console.log(`download ${url}`);
            request(url,(err,response,body)=>{
                if(err){
                    callback(err);
                }
                //다운로드받은 문서 파일에 쓰기
                else{
                    mkdirp(path.dirname(filename),err =>{
                        if(err){
                            callback(err);
                        }
                        else{
                            fs.writeFile(filename,body,err=>{
                                if(err){
                                    callback(err);
                                }
                                else{
                                    callback(null,filename,true);
                                }
                            });
                        }
                    });
                }
            });

        }
        else{
            callback(null,filename,false);
        }
    });
}

module.exports = {spider}