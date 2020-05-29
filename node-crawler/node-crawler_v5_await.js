const request = require('request');
const fs = require('fs');
const mkdirp = require('async-mkdirp');
const path = require('path');
const utilities = require('./utilities');
const async = require('async');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);
const requestAsync = promisify(request);
const writeFileAsync = promisify(fs.writeFile);
let number = 0;
const downloadQueue = async.queue((taskData, callback) => {
    spider(taskData.link, taskData.nesting - 1, callback);
}, 2);
let spidering = new Map();


/**
 * @param {string} url : 스크래핑할 URL 
 * @param {integer} nesting : 접근횟수 제한
 * @param {function} callback : 종료시 콜백함수
 * @description 웹페이지의 URL수집후 파일로 다운로드
 */
const spider = async (url, nesting, callback) => {

    //url이 존재할경우(수집된경우) callback()
    if (spidering.has(url)) {
        return process.nextTick(callback);
    }
    //map에 저장(중복된 URL수집방지)
    spidering.set(url, true);
    const filename = utilities.urlToFilename(url);
   
    try {

        const body = await readFileAsync(filename);
        
        spiderLink(url, body, nesting, callback);

    }
    catch (err) {

        if (err.code !== 'ENOENT') {
            return callback(err);
        }
        //url에 해당하는 문서다운로드
        return download(url, filename, (err, body) => {
            if (err) {
                return callback(err);
            }
            //file에 있는 링크추출
            spiderLink(url, body, nesting, callback);
        });


    }

}

/**
 * 
 * @param {string} filename : 저장할 파일이름
 * @param {string} content : 파일내용
 * @param {string} callback : 종료시 콜백
 */
const saveFile = async (filename, content) => {

    try {
        await mkdirp(path.dirname(filename));
        return await writeFileAsync(filename, content, 'utf8');
    } catch (err) {
        throw err;
    }
}

/**
 * @param {string} url : 다운로드할 url
 * @param {string} filename : 저장할 파일이름
 * @param {funtion} callback : 종료시 콜백
 */
const download = async (url, filename, callback) => {
    console.log(`Downloading ${url}`);
    try {
        const response = await requestAsync(url);
        await saveFile(filename, response.body);
        console.log(`Downloaded and saved ${url} (${number++})`);

        callback(null, response.body);
    } catch (err) {
        return callback(err);
    }
}

/**
 * 
 * @param {string} currentUrl : 현재url
 * @param {string} body : 파일내용
 * @param {int} nesting : scraping 제한변수
 * @param {func} callback : 종료시 콜백
 */
const spiderLink = (currentUrl, body, nesting, callback) => {
    if (nesting === 0) {
        return process.nextTick(callback);
    }
    //페이지에 포함된 링크추출
    const links = utilities.getPageLinks(currentUrl, body);

    if (links.length === 0) {
        return process.nextTick(callback);
    }

    let completed = 0, hasErrors = false;

    //페이지에서 추출한 링크전부에 대해 재귀함수 호출
    links.forEach(link => {
        const taskData = { link: link, nesting: nesting };
        downloadQueue.push(taskData, err => {
            if (err) {
                hasErrors = true;
                return callback(err);
            }
            if (++completed === links.length && !hasErrors) {
                callback();
            }
        })
    });

}
module.exports = { spider }