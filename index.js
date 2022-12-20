// @babel/register 只有一个功能，就是重写 node 的 require 方法
// @babel/register 在底层改写了 node 的 require 方法，在代码里引入 @babel/register 模块后，
// 所有通过require引入并且以 .es6，.es，.jsx， .mjs，和 .js 为后缀名的模块都会被 Babel 转译。

require('babel-core/register');
require('./app');

