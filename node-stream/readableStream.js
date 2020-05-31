const stream = require('stream');
const Chance = require('chance');

const chance = new Chance();

class RandomStream extends stream.Readable {
  constructor(options) {
    super(options);
  }

  /*
  _read(size) {
    /*const chunk = chance.string();          //[1]
    
    console.log(`Pushing chunk of size: ${chunk.length}`);
    this.push(chunk, 'utf8');             //[2]
    if(chance.bool({likelihood: 5})) {    //[3]
      this.push(null);

    }
    
  }*/
}
RandomStream.prototype._read = function(n) {
  console.log('proto read');

};

RandomStream.prototype.kok = function(n) {
  console.log('proto read kok');

};

module.exports = RandomStream;