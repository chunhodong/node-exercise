var mysql = require('mysql');
const Transform = require('stream').Transform;
const fs = require('fs');

var connection = mysql.createConnection({
  host     : '127.0.0.1',
  port : '3306',
  user     : 'root',
  password : '9502',
  database : 'testdb'
});


let transformStream = new Transform({
    writableObjectMode: true, 
});

transformStream._transform = (chunk, encoding, callback) => {
    
    
    let line = Object.keys(chunk).map((key) => {
        
        return chunk[key];
    }).join(',') + '\n';

    this.push(line);    
    callback(null);
    
}

connection.connect();
connection.query('SELECT * from pageView').stream().pipe(transformStream).pipe(fs.createWriteStream('result.txt')).on('finish',()=>{
});



/*
connection.query('SELECT * FROM pageView', function (error, results, fields) {
    if (error) throw error;
    //console.log('results : ',JSON.stringify(results));
    
    fs.writeFile('text.txt',JSON.stringify(results),'utf8',(error)=>{
        console.log('end time = ',new Date());    
    
    });


  });
  */
  connection.end();