const fs = require('fs');
const http = require('http');
const request = require('request');


const data = {
    url: {
        "hostname": "scfp-test.obs.cn-south-1.myhuaweicloud.com",
        "href": "https://scfp-test.obs.cn-south-1.myhuaweicloud.com:443/profile/2019/7/8/15625998286482.png?AccessKeyId=J0OSSINRQBZFVZGHHY0Q&Expires=1562603428&Signature=8RLPzVGmN%2B115YTw9qNiIeCsg2U%3D",
        "path": "/profile/2019/7/8/15625998286482.png?AccessKeyId=J0OSSINRQBZFVZGHHY0Q&Expires=1562603428&Signature=8RLPzVGmN%2B115YTw9qNiIeCsg2U%3D",
        "pathname": "/profile/2019/7/8/15625998286482.png",
        "port": "443",
        "protocol": "https:",
        "query": "AccessKeyId=J0OSSINRQBZFVZGHHY0Q&Expires=1562603428&Signature=8RLPzVGmN%2B115YTw9qNiIeCsg2U%3D"
    },
    header: {
        "Content-Type": "text/plain",
        "Host": "scfp-test.obs.cn-south-1.myhuaweicloud.com"
    }
}

function upload(callback) {

    let boundaryKey = '----' + new Date().getTime();    // 用于标识请求数据段
    let options = {
        host: data.url.hostname, // 远端服务器域名
        port: data.url.port, // 远端服务器端口号
        method: 'PUT',
        path: data.url.path, // 上传服务路径
        headers: data.header
    };
    let req = http.request(options, function(res){
        res.setEncoding('utf8');
        res.on('data', function(chunk) {
            console.log('body: ' + chunk);
        });

        res.on('end', function() {
            console.log('res end.');
        });
    });
    const filePath = './1.jpg';
    req.write(
        `--${boundaryKey}rn Content-Disposition: form-data; name="file"; filename="1.png"rn Content-Type: image/plain`
    );

    // 创建一个读取操作的数据流
    // let fileStream = fs.createReadStream(filePath);
    // fileStream.pipe(req, {end: false});
    // fileStream.on('end', function() {
    //     req.end('rn--' + boundaryKey + '--');
    //     callback && callback(null);
    // });
}

// upload(function(){
//     console.log('success!!!!!');
// })

(function uploadRequest(){
    var url = data.url.href;
    const req = request({
        url: url,
        method: 'put',
        json: true,
        headers: data.header,
        // body: JSON.stringify(requestData)
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }else{
            console.log(error);
        }
    });

    const boundaryKey = '----' + new Date().getTime();    // 用于标识请求数据段
    // req.write(
    //     `--${boundaryKey}rn Content-Disposition: form-data; name="file"; filename="2.png"rn Content-Type: image/png`
    // );
    const fileStream = fs.createReadStream('./1.jpg');
    fileStream.pipe(req, {end: false});
    fileStream.on('end', function() {
        // req.end('rn--' + boundaryKey + '--');
        req.end();
        // callback && callback(null);
    });
})()



