# 前端模块化

## ESM模块化

es6 module也叫做esm。是由官方定义的模块化规范，而且esm的模块化规范已经被市面上大部分的浏览器适配了。在现代浏览器中，如果在HTML上加入含有 `type="module"`属性的script标签，那么浏览器会按照esm的标准去执行。

在node环境中之前一直是 CommonJs作为模块标准，如今从node12.2版本开始已经支持原生的esm。这样具有跨平台的规范是很具有影响力。

下面使用一个很简单的例子

```js
// main.js
import { methodA } from "./module-a.js";
methodA();

//module-a.js
const methodA = () => {
  console.log("a");
};

export { methodA };
```

在node.js环境中，可以在 `package.json`文件中声明 `type="module"` 属性:

```js
{
  "type": "module"
}
```

