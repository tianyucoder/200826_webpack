/* 
	1.该文件是webpack的配置文件，所有webpack的任务、用到的loader、plugins都要配置在这里
	2.该文件要符合CJS模块化规范
*/

//引入Node中一个内置的path模块，专门用于解决路径问题
const {resolve} = require('path');
//引入html-webpack-plugin，用于加工html文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
//引入MiniCssExtractPlugin，用于提取css为单独文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//引入OptimizeCssAssetsPlugin，用于压缩css
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

//css相关loader的配置
const baseCssLoader = [
	MiniCssExtractPlugin.loader,
	'css-loader',
	{
		loader: "postcss-loader",
		options: {
			postcssOptions: {
				plugins: [
					"postcss-preset-env",
				],
			},
		},
	},
]

//使用CJS的模块化规范，暴露一个对象，该对象就是webpack的详细配置对象(规则)
module.exports = {
  mode: 'production',//工作模式
  entry: './src/js/app.js', //入口
  output: { //出口(输出)
    path: resolve(__dirname, '../build'), //输出文件的路径
		filename: 'js/app.js', //输出文件的名字
		publicPath:'/build/'
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
        test: /\.less$/, //该loadesr要处理的文件
        use: [...baseCssLoader,'less-loader']
			},
			//配置解析样式中的图片
			{
        test: /\.(png|jpg|gif|bmp)$/,
        use: [{
					loader:'url-loader',
					options:{
						outputPath:'imgs', //配置图片加工后存放的位置
						// publicPath:'/build/imgs', //配置图片引入时前缀路径
						name:'[hash:5].[ext]', //配置生成图片的名字+后缀
						limit:8 * 1024 //图片大小，小于8KB时，将图片转为base64编码
					}
				}]
			},
			//配置解析html中的图片
			{
				test: /\.(html)$/,
				use: ['html-loader']
			},
			//配置解析字体文件
			{
        exclude: /\.(html|less|css|png|jpg|bmp|js|gif|json)$/,
        use: [{
					loader:'file-loader',
					options:{
						outputPath:'media', //配置图片加工后存放的位置
						name:'[hash:5].[ext]', //配置生成图片的名字+后缀
					}
				}]
			},
			//配置js语法检查
			{
        // 对js进行语法检查
        test: /\.js$/,
        exclude: /node_modules/,
        // 优先执行
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
					fix: true //若有问题自动修复，重要！！！！
				}
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ['@babel/preset-env']
					}
				}
			}
    ]
	},
	//plugins中专门用于配置插件，插件必须经过实例化这一环节
	plugins: [
		//实例化HtmlWebpackPlugin
		new HtmlWebpackPlugin({
			//以指定文件为模板创建新的html(1. 结构和原来一样 2. 会自动引入打包的资源)
			template:'./src/index.html' //模板的位置
		}),
		//实例化MiniCssExtractPlugin
		new MiniCssExtractPlugin({
			filename:'/css/index.css'
		}),
		new OptimizeCssAssetsPlugin({
			cssProcessorPluginOptions: {
				preset: ['default', { discardComments: { removeAll: true } }],
			},
		})
	]
};