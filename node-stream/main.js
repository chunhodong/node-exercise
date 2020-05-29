/**
 * @description
 * 1. 큰 파일이나 DB에서 데이터를 read,write하는데 유용함
 * 메모리측면에서 효율적으로 데이터를 처리할수 있음 
 * 2. 처리시간은 따져봐야함 파일을 한번에 읽고 처리하는것과,조금씩 읽어서 바로처리하는 작업에대하여
 *    처리시간/속도를 판별하기 쉽지않음,실제로 mysql 라이브러리로 테스트해본결과 처리시간에 차이는 크지 않음
 * 
 * 3. 직접 인터페이스를 상속받아 구현할경우 처리해야될부분이 많음(ex: 내부버퍼사이즈,callback호출 등등)
 * 4. 여러 스트림을 연결해서 모듈화할경우 스트림간 이벤트는 전파 안됨
 * 5. 대용량 파일을 처리하는데 유용하게 쓸듯함(스트림자체 특성/추가된 라이브러리)  
 */

 const concatFiles = require('./multifileStream');
 concatFiles(process.argv[2],process.argv.slice(3),()=>{
     console.log('File process success');
 });