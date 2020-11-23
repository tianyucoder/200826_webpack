/* 
	1.该文件是webpack的配置文件，所有webpack的任务、用到的loader、plugins都要配置在这里
	2.该文件要符合CJS模块化规范
*/

//引入Node中一个内置的path模块，专门用于解决路径问题
var path = require('path');

//使用CJS的模块化规范，暴露一个对象，该对象就是webpack的详细配置对象(规则)
module.exports = {
  mode: 'development', //工作模式
  entry: './src/js/app.js', //入口
  output: { //出口(输出)
    path: path.resolve(__dirname, 'build'), //输出文件的路径
    filename: 'app.js' //输出文件的名字
  }
};