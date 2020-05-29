
const mysql = require('mysql2/promise');
const db_config = require('../config/config');

const pool = mysql.createPool({
    host: db_config.host,
    port: db_config.port,
    user: db_config.user,
    password: db_config.password,
    database: db_config.database,
    connectionLimit: db_config.connectionLimit,
    charset : 'utf8mb4'
});


const delay = async (item) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(item);
            resolve();
        }, 500);
    });


}


//delay 실행: 동기,loop1실행: 비동기
const loop1 = async (array) => { 
    array.forEach(async item => { 
        await delay(item); 
    }); 
    console.log("Done!"); 
} 

//delay 실행: 동기,loop2실행: 동기
const loop2 =  async (array) => {
    for (const item of array) {
      await delay(item);
      console.log('hi');
    }
    console.log("Done!");
}

//delay 실행: 동기,loop3실행: 동기
const loop3 = async () => {
    for (let i = 0; i < 10;i++) {
      console.log('hi');
    }
    console.log("Done!");
}


//delay 실행: 동기,loop2실행: 동기
const parallel = async (array) => { 
    const promises = array.map(item => delay(item)); 
    await Promise.all(promises); 
    console.log("Done!"); 
}

//즉시실행함수

(async () => {
    const array = [1, 2, 3,4,5,6,7,8,9,10];
    for (const item of array) {
        await delay(item);
        console.log('mins');
      }
      console.log("Done!");


  })();
  console.log('end!');
  
const timeFunc = async () =>{
    await setTimeout(()=>{
        console.log('timeout!!');
    },500);
}

const runSync = async () =>{
    //await가 추가되면 loop2내부에 있는 모든 promise 비동기 실행이 끝날때까지 기다림
 //   await loop2([1,2,3,4,5,6,7,8,9,10]);
    await parallel([1,2,3,4,5,6,7,8,9,10]);
    
    console.log('end@');
}


const runAsync = async () =>{
    //loop2내부는 순차적으로 실행되지만 console.log함수를 기다려주지 않음
    //실행순서 console.log('end[]') -> loop2([1,2,....]);
    loop2([1, 2, 3,4,5,6,7,8,9,10]);
    console.log('end@');
}


const selectFunc = async (uid, connection) => {
    
    try {
        const query = `SELECT * FROM user WHERE u_id = ${uid}`;
        const [result] = await connection.query(query);
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

//promise.all을 이용해서 query 동시처리
const parallelSelect = async (array) => {

    const promises = array.map(async item => {
        const connection = await pool.getConnection(async conn => conn);
        return selectFunc(item,connection);
    });
    return Promise.all(promises);
}

const sequentialSelect = async (array, connection) => {
    let result = [];
    for await (const uid of array) {
        const connection = await pool.getConnection(async conn => conn);
        const item = await selectFunc(uid, connection);
        result.push(item);

    }
    return result;
}

//mysql query 동시요청
(async () => {
    let temp = [];
    for (let i = 20; i < 60; i++) {
        temp.push(i + 1);
    }
    console.log('before time : ', process.uptime());
    const result = await parallel(temp);
    console.log('after time : ', process.uptime());
})();

//mysql query 순차요청
(async () => {
    let temp = [];
    for(let i = 20; i < 60; i++){
        temp.push( i + 1);
    }
    console.log('before time@@ : ',process.uptime());
    const result = await selectStickerQnaAttach(temp);
    console.log('after time@@ : ',process.uptime());
    console.log('result time : ',result[0]);
})();




