import express from 'express';
const bodyParse = require('body-parser');

const app = express();

console.log(app);

app.all('*', (req, res, next) => {
    const { origin, Origin, referer, Referer } = req.headers;
    const allowOrigin = origin || Origin || referer || Referer || '*';
    res.header('Access-Control-Allow-Origin', allowOrigin);
    res.header(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization, X-Requested-With'
    );
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Credentials', true); //可以带cookies
    res.header('X-Powered-By', 'Express');
    if (req.method == 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

// 存放静态资源
// 前端可以直接获取这个文件夹下的图片资源
app.use(express.static('./public', { extensions: ['png', 'jpg', 'html', 'mp4'] }));

// express.json()函数是Express中的内置中间件函数。
// 它使用body-parser解析带有JSON有效负载的传入请求。
app.use(express.json({ limit: 2 }));
app.use(bodyParse.json())

app.listen(3080, function(data) {
    console.log('created a server')
})
