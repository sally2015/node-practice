var fs = require('fs');
var readStream = fs.createReadStream('./original.txt');
var writeStream = fs.createWriteStream('./copy.txt');
console.log(+new Date());
readStream.pipe(writeStream);
console.log(+new Date());