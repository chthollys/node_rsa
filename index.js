const fs = require('fs');
const NodeRSA = require('node-rsa');


//获取加密公钥文件
const PemData=fs.readFileSync("../key.pem","utf-8");
//console.log(PemData)



const key = new NodeRSA(PemData);
const text = 'Hello RSA!';
//读取密钥
//console.log(key);


const encrypted = key.encrypt(text, 'base64');
console.log('encrypted: ', encrypted);


const decrypted = key.decrypt(encrypted, 'utf8');
console.log('decrypted: ', decrypted);


//使用公钥加密例子

let key2 = new NodeRSA();
const publicKey = fs.readFileSync("../pubkey.pem","utf-8");
key2.importKey(publicKey,'pkcs8-public');

const encrypted2 = key2.encrypt(text, 'base64');
console.log('encrypted2: ', encrypted);
