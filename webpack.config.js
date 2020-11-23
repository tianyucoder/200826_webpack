/* 
	1.该文件是webpack的配置文件，所有webpack的任务、用到的loader、plugins都要配置在这里
	2.该文件要符合CJS模块化规范
*/

//引入Node中一个内置的path模块，专门用于解决路径问题
const {resolve} = require('path');
//引入html-webpack-plugin，用于加工html文件
const HtmlWebpackPlugin = require('html-webpack-plugin');

//css相关loader的配置
const baseCssLoader = ['style-loader','css-loader']
//使用CJS的模块化规范，暴露一个对象，该对象就是webpack的详细配置对象(规则)
module.exports = {
  mode: 'development',//工作模式
  entry: './src/js/app.js', //入口
  output: { //出口(输出)
    path: resolve(__dirname, 'build'), //输出文件的路径
    filename: 'js/app.js' //输出文件的名字
	},
	//module.rules中配置的一个一个的loader
	module: {
    rules: [
			//配置解析css
      {
        test: /\.css$/, //该loader要处理的文件
        use: [...baseCssLoader]
			},
			//配置解析less
			{
        test: /\.less$/, //该loader要处理的文件
        use: [...baseCssLoader,'less-loader']
			},
			//配置解析样式中的图片
			{
        test: /\.(png|jpg|gif|bmp)$/,
        use: [{
					loader:'url-loader',
					options:{
						outputPath:'imgs', //配置图片加工后存放的位置
						// publicPath:',/build/imgs' //配置图片引入时前缀路径
						name:'[hash:5].[ext]', //配置生成图片的名字+后缀
						limit:8 * 1024 //图片大小，小于8KB时，将图片转为base64编码
					}
				}]
      }
    ]
	},
	//plugins中专门用于配置插件，插件必须经过实例化这一环节
	plugins: [
		//实例化HtmlWebpackPlugin
		new HtmlWebpackPlugin({
			//以指定文件为模板创建新的html(1. 结构和原来一样 2. 会自动引入打包的资源)
			template:'./src/index.html' //模板的位置
		})
	]
};