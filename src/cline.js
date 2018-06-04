const fs = require('fs');
const net = require('net');
const NodeRSA = require('node-rsa');


const PORT = 3307;

let text = "5D41402ABC4B2A76B9719D911017C592";
const ServerPublicKey = new NodeRSA();

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

var client = new net.Socket();
client.connect(PORT, '127.0.0.1', function() {
    //第一步向服务器发送获取公钥请求
 	  client.write(sendData("Get RSA Public Key"));
});

client.on('data', function(data) {
    const receiveData = pauseData (data);
    //第三步将明文使用公钥进行加密
    if(receiveData.head === "Public Key"){
        //console.log(receiveData.body);
        ServerPublicKey.importKey(receiveData.body, 'pkcs8-public');
        var encryptedData = ServerPublicKey.encrypt(text, 'base64');
        let sendBuffer = sendData("encrypted code",encryptedData);
        client.write(sendBuffer);
    }
    if(receiveData.head === "End"){
        console.log("send success!")
        client.end();
    }
});

client.on('close', function() {
	console.log('Connection closed');
});

client.on('error', (error) => {
    console.log(error)
});
