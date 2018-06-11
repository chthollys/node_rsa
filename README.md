# 一个nodejs使用RSA网络通信加密例子


### 安装

```shell
git clone https://github.com/chthollys/node_rsa.git
cd node_rsa
npm install
```

### 启动服务程序，读取密钥文件，并监听端口

```sh
node server.js
```
### 密钥文件可以使用程序自带的也可以使用openssl生成
```sh
openssl genrsa -out rsa_private_key.pem 1024
```

### 启动客户端，向获取服务端获取公钥，并使用公钥加密明文

```sh
node server.js
```
### 接着服务端上会显示经过私钥解密后点明文内容
