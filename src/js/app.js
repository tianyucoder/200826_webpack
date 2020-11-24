/*
app.js是webpack的入口，所有外部文件(js、json、css、less等等)都需要在这里引入使用
*/
import { sub, sum } from './module1';
import { data as d, message } from './module2';
import school from './module3';
import data from '../json/test.json';
import '../css/demo.css';
import '../css/demo.less';
import '../css/iconfont.css';
import '@babel/polyfill'; // 包含ES6的高级语法的转换

sum(1, 2);
sub(3, 4);
console.log(d);
console.log(message);
console.log(school);
console.log(data);

const obj = { a: () => { console.log('#0826#'); } };
const { a } = obj;
a();
const p = new Promise((resolve) => {
  setTimeout(() => {
    resolve(900);
  }, 1000);
});
p.then(
  (value) => { console.log('成功了', value); },
  (reason) => { console.log('失败了', reason); },
);
