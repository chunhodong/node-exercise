//worker.js 파일
const {Worker,workerData,parentPort} = require('worker_threads');
let jobSize = 100000;
const {obj} = workerData;

//호출한 스레드로부터 전달받음 메시지
//쓰레가 종료되지 않고 대기함
parentPort.on('message',(msg)=>{
	console.log('from main =>',msg);
});


const doSomething = () =>{
	let data;
	for (let i = 0; i < jobSize; i++) {      // CPU Hard
		data += i;
	}
}
// 스레드가 처리해야 작업
doSomething();


//호출한 스레드로 메시지전달
parentPort.postMessage(obj);


