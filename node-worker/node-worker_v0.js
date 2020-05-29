const { Worker } = require('worker_threads');
let jobSize = 100000;

let myWorker1, myWorker2;

//스레드객체로 전달할 객체
let obj = {
	value : 13
}

// 스레드를 생성해 파일 절대경로를 통해 가리킨 js파일을 작업
myWorker1 = new Worker(__dirname + '/worker.js',{workerData:{obj}});

//스레드로 메시지 전달
myWorker1.postMessage('toThread');


//스레드로부터 전달된 메시지 수신
myWorker1.on('message', (msg)=>{
	console.log('work1 message =>',msg);
	
myWorker1.removeListener('message',()=>{

});
myWorker1.unref();
    
});

/*

myWorker2 = new Worker(__dirname + '/worker.js',{workerData:{obj}});
myWorker2.on('message', (msg)=>{
    console.log('worker2 message =>',msg.value);

});
end();


let myWorker3 = new Worker(__dirname + '/worker.js',{workerData:{obj}});
myWorker3.on('message', (msg)=>{
	console.log('worker2 message is : ',msg.value);
	
});
*/
const calc = () => {
	let data = 0;
	for (let i = 0; i < jobSize; i++) {
		data += i;
	}
}
calc();  //메인스레드에서 처리하는 작업

