const net = require('net');
const NodeRSA = require('node-rsa');

let test = 'Hello RSA!';
const ServerPublicKey = new NodeRSA();


var client = new net.Socket();
client.connect(54464, '127.0.0.1', function() {
 	  client.write('Get RSA Public Key');
});

client.on('data', function(data) {
	  console.log('Received: ' + data);
    //ServerPublicKey.importKey(data, 'pkcs8-public');
    //var encryptedData = ServerPublicKey.encrypt(text, 'base64');
    //client.write('Get RSAs Public Key');
	  // kill client after server's response
    client.end();
});

client.on('close', function() {
	console.log('Connection closed');
});
