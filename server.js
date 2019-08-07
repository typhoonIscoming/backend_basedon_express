const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose')
const bodyParse = require('body-parser')
const app = express()

const upload = require('./src/lib/upload')



// 存放静态资源
// 前端可以直接获取这个文件夹下的图片资源
app.use(express.static('./public', {
    extensions: ['png', 'jpg', 'html', 'mp4']
}));
app.use(express.json({
    limit: 2
}))

app.use(bodyParse.json())

/******这里设置模板引擎的位置，好让res.render函数从这个目录去寻找文件****/
// 这里默认是ejs或者jade模板文件
app.set('views', __dirname + '/src/views');
/**************************************************************/

/************如果要设置html文件为模板的话，那么就要设置html为模板引擎***/
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
/************************************************************* */

// 设置全局变量 可以通过app.get('env')获取到对应的值
app.set('env', 'dev')

// app.set('jsonp callback name', 'cb');

/************************前端请求相关的就会执行controller**************/
const controller = require('./controllers/todocontrollers')
controller(app)
/******************************************************************/


// mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true });
// const todoSchema = new mongoose.Schema({
//     item: String,
//     price: Number,
// });
// const Todo = mongoose.model('store', todoSchema);
// var itemOne = Todo.create({ item: 'buy flowers', price: 200 }, { item: 'buy yellow flowers', price: 100 }, function(err) {
//     if (err) throw err;
//     console.log('item saved');
// });

// Todo.find({ 'price': { $gt: 150 } }, function(err, data) {
//     console.log('data', data)
// })

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function (callback) {
//     console.log("数据库成功连接");
// });
// const result = db.collection.find()

app.listen(3080, function(data) {
    console.log('created a server')
})













