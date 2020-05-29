const Transform = require('stream').Transform;

/**
 * @description write에서받아서 다음 read 스트림으로 forwarding 
 * 
 */
const upperCaseTr = new Transform({
    transform(chunk, encoding, callback) {
        this.push(chunk.toString().toUpperCase());
        //callback을 호출해야 다음 chunk를 읽을수 있음
        callback();
    }
});


//pipe로 연결하면 read(),write()를 호출할 필요없음
process.stdin.pipe(upperCaseTr).pipe(process.stdout);