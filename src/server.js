/*
* 一个用于RSA加密通信的例子
*
*/
const fs = require('fs');
const NodeRSA = require('node-rsa');
const net = require('net');
const client = new net.Socket();
//-----------配置项-------------
const PORT = 3307;
//获取原始的密钥文件，包含公钥和私钥
const PemData=fs.readFileSync("../key1024.pem","utf-8");
//------------------------------

function sendData (head,body){
    let dataObj = {};
    dataObj.head = head;
    dataObj.body = body || "";
    return JSON.stringify(dataObj);
}

function pauseData (data) {
		//console.log(data.toString());
    const receiveData = JSON.parse(data.toString());
    let resiveObj = {};
    resiveObj.head = receiveData.head;
    resiveObj.body = receiveData.body;
    return resiveObj;
}

//生成密钥对象
const key = new NodeRSA(PemData);
//读取密钥
//console.log(key);
//发送公钥给客户端
var server = net.createServer((socket) => {
		    socket.on('data', (data) => {
						const receiveData = pauseData (data);
						//第二步，服务器把公钥发给客户端
						if(receiveData.head === "Get RSA Public Key"){
								let sendBuffer = sendData("Public Key",key.exportKey('pkcs8-public'));
								socket.write(sendBuffer);
						}
						//第四步，用私钥解密密文
						if(receiveData.head === "encrypted code"){
								const decrypted = key.decrypt(receiveData.body, 'utf8');
								console.log(decrypted);
								let sendBuffer = sendData("End");
								socket.write(sendBuffer);
						}
		    });

				//关闭连接后
		    socket.on('end', () => {
		        //console.log('Client disconnected');
						socket.destroy()
		    });
				//错误处理
				socket.on('error', (error) => {
		        console.log(error)
    		});
    }).listen(PORT, () => {
    		console.log(`Socket server for text started on port ${PORT}`);
});
