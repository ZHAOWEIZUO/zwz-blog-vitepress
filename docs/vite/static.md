# 静态资源处理

## 图片

### 1.图片的正常使用

在html中或者 jsx中使用

```html
<img src="../../assets/a.png"></img>
```

css 中通过设置背景图使用

```csss
background: url('../../assets/b.png') norepeat;
```

js中动态显示图片

```js
document.getElementById('hero-img').src = '../../assets/c.png'
```

### 2. 在vite 中使用

在vite 中使用我们可以通过设置别名把前面的相同路径设置一个别名，这样就不用每次麻烦了

```ts
// vite.config.ts
import path from "path";

export default defineConfig({
  resolve: {
    // 设置别名
    alias: {
      "@assets": path.join(__dirname, "src/assets")
    }
  }
})
```

这样在代码中都可以直接用 @assets开头了，很方便。

### 3. SVG 图片的加载

svg 图片放大可以不失真，而且体积也比常规的图片小。上面说的几种显示图片的方法svg 也可以使用，但是我们也可以将svg作为组件导入项目中使用，这样我们就可以修改svg 的各种属性。当然我们也要使用这种插件。

- Vue2 中使用 [vite-plugin-vue2-svg](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fpakholeung37%2Fvite-plugin-vue2-svg)插件。

- Vue3 项目中可以引入 [vite-svg-loader](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fjpkleemans%2Fvite-svg-loader)。

- React 项目使用 [vite-plugin-svgr](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fpd4d10%2Fvite-plugin-svgr)插件。

  

但是这边 react 插件建议使用 1.0.1 版本的，高版本的ts可能会报错。

```bash
pnpm i vite-plugin-svgr@1.0.1
```

然后做相关配置

```ts
// vite.config.ts
import svgr from 'vite-plugin-svgr';
plugins: [
  // 其它插件省略
  svgr()
]
```

```json
// tsconfig.json

"compilerOptions": {
   // 省略其它配置
   "types": ["vite-plugin-svgr/client"]
 }
```

在页面中使用

```tsx
import { ReactComponent as ReactLogo } from "@assets/react.svg";
export function Header() {
  return <ReactLogo></ReactLogo>;
}
```

## JSON加载

vite已经内置了对JSON文件的解析，底层使用了@rollup/pluginutils 的dataToEsm 方法将 JSON 对象转换为一个包含各种具名导出的 ES 模块，使用姿势如下:

```ts
import { version } from '../../../package.json';
```

也可以在 viteconfig里面配置下禁止按名导入的方式

```ts
// vite.config.ts

{
  json: {
    stringify: true
  }
}
```

这样会将JSON 的内容解析为 `export default JSON.parse("xxx")`  这样失去按名导出的能力。

## Web Worker 脚本

web worker是html提供的 在js执行中的 另外一个线程，因为js是单线程，但是有的时候需要多线程，这样html就提供了webworker ，他是运行在页面中的另外一个线程，他不会随着主线程结束而结束。主线程和 他之间的通讯是通过 postMessage。

```js
const start = () => {
  let count = 0;
  setInterval(() => {
    // 给主线程传值
    postMessage(++count);
  }, 2000);
};

start();
```

```tsx
// import { ReactComponent as ReactLogo } from "@assets/react.svg";
import { version } from "../test.json";
 import Worker from "./example.js?worker";
 const worker = new Worker();

worker.addEventListener("message", (e) => {
   console.log(e);
});

export function Header() {
  return <div>{version}</div>;
}
```

引入的时候 后缀加上 `?worker` 让 vite 知道这是个 web worker

### 其他静态资源文件

vite可以导入以下配置文件

- 媒体类文件，包括`mp4`、`webm`、`ogg`、`mp3`、`wav`、`flac`和`aac`。
- 字体类文件。包括`woff`、`woff2`、`eot`、`ttf` 和 `otf`。
- 文本类。包括`webmanifest`、`pdf`和`txt`。

也就是说你可以在vite 项目中将这些类型的文件当做一个es模块来导入，但是你还有其他类型的文件可以在

```ts
//viteconfig.ts
{
  assetsInclude: ['.gltf']
}
```



## 生产环境处理

生成上我们会碰到很多问题如下

- 部署域名怎么配置
- 资源打包成单文件还是作为 Base64 格式内联?
- 图片太大怎么压缩
- svg 请求次数太多怎么优化？

### 1. 自定义域名部署

上线生产的时候我们会将图片放在CDN 上面，否则项目打完包的体积很大。开发的时候地址写的是本地，打完包自动替换路径。

在viteconfig.ts 文件配置如下

```ts
// vite.config.ts
// 是否为生产环境，在生产环境一般会注入 NODE_ENV 这个环境变量，见下面的环境变量文件配置
const isProduction = process.env.NODE_ENV === 'production';
// 填入项目的 CDN 域名地址
const CDN_URL = 'xxxxxx';

// 具体配置
{
  base: isProduction ? CDN_URL: '/'
}

// .env.development
NODE_ENV=development

// .env.production
NODE_ENV=production
```

项目根目录下面有两个关于环境的配置文件 `.env.development`,`.env.production`  为了区分我们加上相对应的环境变量

### 2. 单文件or内联

在vite中所有的静态资源会有两种构建方式一种是打包成单独的文件和通过base64的方式内嵌到代码中去。

对于体积较小的资源会内嵌到代码中，不会影响代码的性能，反而减少网络的请求优化网络性能。对于体积较大的资源，就会推荐单独打成一个包，否则内嵌到代码中代码体积变大页面加载速度变慢。

vite内置的优化方案是

- 如果静态资源 >= 4kb，则会提取到单独的文件
- 如果静态资源 < 4kb，则会内嵌到代码里 

上面说的 4kb 是一个临界值，也可以通过`build.assetsInlineLimit` 来配置。

```ts
// vite.config.ts
{
  build: {
    // 8 KB
    assetsInlineLimit: 8 * 1024
  }
}
```

但是svg文件不会受这个影响因为他要单独打成一个文件，需要动态设置一些属性。

### 3. 图片的压缩

图片的压缩 vite里面也有开箱即用的插件--- `vite-plugin-imagemini` 

下载插件

```bash
pnpm i vite-plugin-imagemin -D
```

在vite 中配置相关文件

```ts
//vite.config.ts
import viteImagemin from 'vite-plugin-imagemin';

{
  plugins: [
    // 忽略前面的插件
    viteImagemin({
      // 无损压缩配置，无损压缩下图片质量不会变差
      optipng: {
        optimizationLevel: 7
      },
      // 有损压缩配置，有损压缩下图片质量可能会变差
      pngquant: {
        quality: [0.8, 0.9],
      },
      // svg 优化
      svgo: {
        plugins: [
          {
            name: 'removeViewBox'
          },
          {
            name: 'removeEmptyAttrs',
            active: false
          }
        ]
      }
    })
  ]
}
```

### 4. 雪碧图优化
