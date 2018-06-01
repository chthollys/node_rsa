/*
* 一个用于RSA加密通信的例子
*
*/
const fs = require('fs');
const NodeRSA = require('node-rsa');
const net = require('net');
const client = new net.Socket();
//-----------配置项-------------
const PORT = 54464;

//------------------------------
//获取原始的密钥文件，包含公钥和私钥
const PemData=fs.readFileSync("../key.pem","utf-8");
//console.log(PemData)

//生成密钥对象
const key = new NodeRSA(PemData);
const text = 'Hello RSA!';
//读取密钥
//console.log(key);
//发送公钥给客户端
var server = net.createServer((socket) => {
		    console.log('webserver');
		    socket.on('data', (data) => {
		        console.log(`${data.toString()}`);
            socket.write(key.exportKey('pkcs8'));
				   
		    });

		    socket.on('end', () => {
		        console.log('textClient disconnected');
						socket.destroy()
		    });

				socket.on('error', (error) => {
		        console.log(error)
    		});
    }).listen(PORT, () => {
    		console.log(`Socket server for text started on port ${PORT}`);
});


const encrypted = key.encrypt(text, 'base64');

const decrypted = key.decrypt(encrypted, 'utf8');
console.log(decrypted);


//使用公钥加密例子

let key2 = new NodeRSA();
const publicKey = fs.readFileSync("../pubkey.pem","utf-8");
key2.importKey(publicKey,'pkcs8-public');

const encrypted2 = key2.encrypt(text, 'base64');
//console.log('encrypted2: ', encrypted);
