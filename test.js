const mysql = require('mysql2/promise');
const db_config = require('./config/config');

/*
try {
    setTimeout(() => {
        try{

         throw 'Error!'; 
        }catch(error){
            console.log('error catch');
        }
        }, 1000);
  } catch (e) {
    console.log('에러를 캐치하지 못한다..');
    console.log(e);
  };
  */

const delay = async (item) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('item : ', item);
            resolve(item);
        }, 500);
    });


}


const pool = mysql.createPool({
    host: db_config.host,
    port: db_config.port,
    user: db_config.user,
    password: db_config.password,
    database: db_config.database,
    connectionLimit: db_config.connectionLimit,
    charset: 'utf8mb4'
});

//14,15,16,17,18,19,20
const selectFuncPromise = async (uid, connection) => {

    return new Promise((resolve, reject) => {
        setTimeout(async () => {

            try {
                const query = `SELECT * FROM user WHERE u_id = ${uid}`;
                const [result] = await connection.query(query);
                 resolve(result[0]);
            } catch (error) {
                console.error(error);

                throw error;
            }
        }, 500);
    });


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
const parallelSelect = async (array) => {

    const promises = array.map(async item => {
        const connection = await pool.getConnection(async conn => conn);
        return selectFunc(item,connection);
    });
    return Promise.all(promises);
}


/*
(async () => {
    let temp = [];
    for (let i = 20; i < 60; i++) {
        temp.push(i + 1);
    }
    console.log('before time : ', process.uptime());
    const result = await parallel(temp);
    console.log('after time : ', process.uptime());
})();
*/




const selectStickerQnaAttach = async (array, connection) => {
    let result = [];
    for await (const uid of array) {
        const connection = await pool.getConnection(async conn => conn);
        const item = await selectFunc(uid, connection);
        result.push(item);

    }
    return result;
}


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








