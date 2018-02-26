const express = require('express');
const app = express();
const favicons = require('connect-favicons');

const appData = require('./data/test.json');
const appData1 = require('./data/echartData.json');
const rootEntitys = require('./data/rootEntitys.json');
const childEntitys = require('./data/childEntitys.json');
const dataNode = require('./data/dataNode.json');
const dataPoint = require('./data/dataPoint.json');
const history = require('./data/history.json');

app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization,\'Origin\',Accept,X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('X-Powered-By', ' 3.2.1');
    res.header('Content-Type', 'application/json;charset=utf-8');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.use(favicons(__dirname + '/src/assets/logo'));

// 对网站首页的访问返回 "Hello World!" 字样
app.get('/', function(req, res) {
    res.send(appData);
});

// 网站首页接受 POST 请求
app.post('/', function(req, res) {
    res.send(appData);
});

app.get('/data', function(req, res) {
    res.send(appData1);
});

app.get('/datatree/entitys/root', function(req, res) {
    res.send(rootEntitys);
});

app.get('/datatree/entitys/childs', function(req, res) {
    res.send(childEntitys);
});

app.get('/datatree/datanode', function(req, res) {
    res.send(dataNode);
});

app.get('/datatree/datapoint', function(req, res) {
    res.send(dataPoint);
});

app.get('/datatree/datapointstate', function(req, res) {
    res.send(history);
});

// 网站首页接受 POST 请求
app.post('/data', function(req, res) {
    res.send(appData1);
});


const server = app.listen(9000, function() {
    const host = server.address().address;
    const port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});