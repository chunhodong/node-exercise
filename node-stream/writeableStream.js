var stream = require('stream');
var util = require('util');
// Node.js Writable 이 없을 경우, polyfill을 로드
var Writable = stream.Writable || require('readable-stream').Writable;

var memStore = { };

/* Writable memory stream */
function WMStrm(key, options) {
    // new operator 없이 사용할 수 있도록
    if (!(this instanceof WMStrm)) {
        return new WMStrm(key, options);
    }
    
    Writable.call(this, options); // init super
    this.key = key; // save key
    memStore[key] = new Buffer(''); // empty
    
  
 
    
}
util.inherits(WMStrm, Writable);


WMStrm.prototype._write = function (chunk, enc, cb) {
    console.log('write_ proto call');
    
    // 버퍼 형태로 일단 memory store 에 저장
  var buffer = (Buffer.isBuffer(chunk)) ? chunk : new Buffer(chunk, enc); //버퍼면 바로 저장하고 아니면 컨버팅해서 저장
  // 기존 버퍼에 추가
  memStore[this.key] = Buffer.concat([memStore[this.key], buffer]);
  cb();
};

WMStrm.prototype.uk = function (chunk, enc, cb) {
  console.log('uk');
};


// 위에서 만든 것 테스트
var wstream = new WMStrm('foo');
/*wstream._write = function (chunk, enc, cb) {
    console.log('write_ call');

    // 버퍼 형태로 일단 memory store 에 저장
    var buffer = (Buffer.isBuffer(chunk)) ? chunk : new Buffer(chunk, enc); //버퍼면 바로 저장하고 아니면 컨버팅해서 저장
    // 기존 버퍼에 추가
    memStore[this.key] = Buffer.concat([memStore[this.key], buffer]);
    cb();
  };*/
wstream.on('finish', function () {
    console.log('쓰기 완료');
    console.log('데이터:', memStore.foo.toString());
});
wstream.write('hello ');
wstream.write('world');
wstream.end();