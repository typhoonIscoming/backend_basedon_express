const fs = require('fs')

module.exports = function(app) {
    app.get('/todo', function(req, res) {
        const data = [ {item: 'get milk'}, {item: "walk dog"}, {item: 'kick some coding ass'} ];
        // 渲染这个文件的模板，这里直接写文件名就行，因为在server.js文件中已经设置了views的路径
        // 默认的文件是项目根目录下的views文件
        res.render('ejs.html', { todos: data });
    })

    app.post('/todo', function(req, res) {

    })

    app.delete('/todo', function(req, res) {

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
}