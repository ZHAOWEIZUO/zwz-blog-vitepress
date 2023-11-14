# 样式接入方案

## css预处理器

vite本身做了内置支持，也就是我们下载了包，不需要配置，实现零配置。

先下载sass预处理器

```bash
pnpm i sass -D
```

如下代码是在项目中的使用

```tsx
// index.tsx
import './index.scss';
export function Header() {
  return <p className="header">This is Header</p>
};

// index.scss
.header {
  color: red
}
```

这样sass已经在项目中成功使用。在sass也可以使用变量

我们在src下面新建一个文件 `variable.scss` 文件，内容如下

```css
$theme-color: red;
```

然后我们直接在index.scss页面使用

```scss
@import "../../variable.scss"
.header {
  color: $theme-color;
}
```

但是一些公共的变量，不可能每次都引入，我们通过vite的配置实现每次自动导入

```ts
import { defineConfig, normalizePath } from 'vite'
import react from '@vitejs/plugin-react'
// 如果类型报错，需要安装 pnpm i @types/node -D
import path from 'path';
// 可以用 normalizePath 解决window下的路径问题
const variablePath = normalizePath(path.resolve('./src/variable.scss'));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // css相关配置
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "${variablePath}";`
      }
    }
  }
})
```

## CSS Modules

vite也是对css.module具有开箱即用的能力，vite对将后缀带有.module的文件解析成 css modules。

如下是例子

现将原先的 index.scss 改成 index.module.scss ，然后将index.tsx 文件改动下

```tsx
import styles from './index.module.scss'
export function Header() {
  return <p className={styles.header}>This is Header</p>
}
```

然后我们看在浏览器中的p标签

```html
<p class="_header_gxlcr_1">This is Header</p>
```

类名是个哈希值，这样可以避免类名的污染。当然vite 也可以统一配置自定义类名的

```ts
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      // 一般通过 generateScopedName 来设置类名
      // 其中name 代表当前文件名，local代表类名
      generateScopedName: "[name]__[local]___[hash:base64:5]"
    },
    ....省略
  }
})
```

下面是浏览器展示p标签

```html
<p class="index-module__header___IdNfn">This is Header</p>
```



## PostCSS

一般是通过postcss.config.js来配置postcss但是，vite的配置文件中已经提供了postcss的入口，我们可以直接在vite配置文件中操作：

我们先介绍最常用的插件autoprefixe，先下载autoprefixe。功能就是让css兼容各种浏览器

```bash
pnpm i autoprefixer -D
```

然后再配置文件中

```ts
import autoprefixer from 'autoprefixer';
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        autoprefixer({
          // 指定目标浏览器
          overrideBrowserslist: ['Chrome > 40', 'ff > 31', 'ie 11']
        })
      ]
    }
  }
})
```

然后我们在index.scss里面加上代码

```css
.header {
  <!-- 前面的样式省略 -->
  text-decoration: dashed;
}
```

打包完可以看到

```css
._header_kcvt0_1 {
  <!-- 前面的样式省略 -->
  -webkit-text-decoration: dashed;
  -moz-text-decoration: dashed;
  text-decoration: dashed;
}
```

PostCss也可以用 postcss-pxtorem插件，可以将px单位转化为rem单位，在适配移动端的场景下可以用

postcss-pxtorem 插件配置最重要的属性是

```js
rootValue: 根元素的值，即1rem对应的像素值大小，一般设置为设计稿尺寸/10
```

还有下面几种属性

- propList：需要进行转化的css属性的值，可以使用通配符，列如 * 是将所有属性单位进行转换。

- selectorBlackList： 不进行单位转换的选择器。如设置为字符串`body`，则所有含有body字符串的选择器都不会被该插件进行转换；若设置为`[/^body$/]`，则`body`会被匹配到而不是`.body`

- exclude: 不需要进行转换的文件。

- mediaQuery： 是否允许像素在媒体查询中转换。

  

在项目中下载插件

```bash
pnpm add postcss-pxtorem -D
```

配置文件

```ts
import postCssPxToRem from 'postcss-pxtorem'

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      。。。。。省略配置
      plugins: [
        postCssPxToRem({
          rootValue:37.5, // 设计稿尺寸/10
          propList:['*'], // 作用与全部文件
        })
      ]
    }
  }
})
```

