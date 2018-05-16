var fs = require('fs');
var ursa = require('ursa');

var data=fs.readFileSync("../pubkey.pem","utf-8");
console.log(data)
