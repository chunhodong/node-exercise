const crypto = require('crypto');
const result0 = crypto.createHash('sha512').update('비밀번호').digest('base64'); 

const result1 = crypto.createHash('sha512').update('비밀번호').digest('base64');
const result2 = crypto.createHash('sha512').update('비밀번호').digest('hex'); 
console.log('result is : ',result0);
console.log('result is : ',result1);
console.log('result is : ',result2);


crypto.randomBytes(64, (err, buf) => {
    crypto.pbkdf2('비밀번호', buf.toString('base64'), 100000, 64, 'sha512', (err, key) => {
      console.log(key.toString('base64')); // 'dWhPkH6c4X1Y71A/DrAHhML3DyKQdEkUOIaSmYCI7xZkD5bLZhPF0dOSs2YZA/Y4B8XNfWd3DHIqR5234RtHzw=='
    });
  });