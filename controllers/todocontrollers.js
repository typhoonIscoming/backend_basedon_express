const fs = require('fs');
// 接口请求
const request = require('request-promise');
// 缓存
const NodeCache = require('node-cache');

const qs = require('qs');

const tools = require('../src/utils/tools');

// 加密库
const sha1 = require('sha1');

// 微信的secrect有效期是7200秒
const myCache = new NodeCache({ stdTTL: 7100, checkperiod: 120 });


module.exports = function(app) {
    app.get('/todo', function(req, res) {
        const data = [ {item: 'get milk'}, {item: "walk dog"}, {item: 'kick some coding ass'} ];
        // 渲染这个文件的模板，这里直接写文件名就行，因为在server.js文件中已经设置了views的路径
        // 默认的文件是项目根目录下的views文件
        res.render('ejs.html', { todos: data });
    })

    app.get('/', function(req, res) {
        const query = req.query
        res.send(query)
    })
    
    app.post('/', function(req, res) {
        console.dir(req.body)
        res.send('hahaxixi')
    })
    
    app.get('/form',(req,res)=>{
        // 这里的话需要用同步读取文件,异步的话fileData将在响应前得不到内容
        let fileData = fs.readFileSync('./src/views/form.html',{ encoding:'utf8' });
        res.send(fileData);
    })
    app.get('/index',(req,res)=>{
        // 这里的话需要用同步读取文件,异步的话fileData将在响应前得不到内容
        let fileData = fs.readFileSync('./src/views/index.html',{ encoding:'utf8' });
        res.send(fileData);
    })

    // 前端页面上传文件
    app.post('/upload', upload.single('logo'), function(req, res) {
        console.dir(req.file);
        res.send({ 'ret_code': 0 });
    });
    
    app.get('/profile/:id/:name', function(req, res) {
        const params = {
            msg: 'this is the home page'
        }
        res.send('your request url\'s id is ' + req.params.id + ' name is ' + req.params.name)
    })

    app.get('/useJsonp', function(req, res) {
        const data = { user: 'xie' }
        // res.jsonp()
        var _callback = req.query.callback;
        console.log(req.url)
        res.type('text/javascript');
        res.send(_callback + '(' + JSON.stringify(data) + ')');
    })
    app.get('/list', function(req, res) {
        const data = { name: 'xie', number: Math.floor(Math.random() * 100) }
        res.type('application/json')
        res.status(200).json(data)
    })

    // 获取微信的token，让微信验证接口
    // 微信secrect
    // secrect = a0cf1ccf45ff156468e0d1e72dde3303
    // http://www.typhooniscoming.cn
    app.get('/getToken', async (req, res) => {
        // console.log('req', req.query)
        const cache = myCache.get('access');
        let access = {};
        // 如果缓存有数据，则直接返回
        if (cache && cache.access_token) {
            access = cache;
            // console.log('缓存')
        } else {
            const result = await request('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx430976683b8d2262&secret=a0cf1ccf45ff156468e0d1e72dde3303');
            access = JSON.parse(result);
            // 将access_token缓存起来
            myCache.set('access', access);
            // console.log('接口')
        }
        // 拿到了access_token之后再去获取票据(jsapi_ticket)
        // console.log('access', access.access_token)
        const getticket = await request(`https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${access.access_token}&type=jsapi`);
        const tickObj = JSON.parse(getticket);

        const noncestr = tools.generateUUID();
        const timestamp = +new Date();

        const url = req.query.url;
        const signature = sha1(qs.stringify({
            noncestr, // 随机字符串
            jsapi_ticket: tickObj.ticket, // 票据
            timestamp,
            url,
        })) 

        res.send({
            noncestr,
            timestamp,
            signature,
            ticket: tickObj.ticket,
        })
    })
}