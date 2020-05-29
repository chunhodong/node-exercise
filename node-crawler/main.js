const spider = require('./node-crawler_v5_await');
console.log('start : ',process.uptime());

spider.spider(process.argv[2],1,(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log(`Download completed`);
        console.log('end : ',process.uptime());

    }
});