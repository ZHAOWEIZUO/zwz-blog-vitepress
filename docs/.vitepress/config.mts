/*
 * @Author: zwz
 * @Date: 2023-11-13 15:36:10
 * @LastEditors: zwz
 * @LastEditTime: 2023-11-13 21:10:42
 * @Description: 请填写简介
 */
import { defineConfig } from 'vitepress';

export default defineConfig({
  title: "zwz Blog",
  description: "A blog",
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '前端',  items: [
        { text: 'CSS系列', link: '/CSS/background' },
        { text: 'VUE源码', link: '/vueSourceCode/path' },
        {text: 'Webpack5', link: '/Webpack5'},
        {text: 'vite', link: '/vite/module'}
      ]},
      {
        text: '后端', items:[
          {text: 'MySql', link: '/Mysql'}
        ]
      }
    ],
    sidebar: {
      '/vueSourceCode': [
        {
          text: 'vue源码',
          items: [
            {text: '数据状态更新时的差异diff以及path机制', link: '/vueSourceCode/path'}
          ],
          collapsed: true
        }
      ],
      '/CSS/': [
        {
          text: 'css系列',
          items: [
            {text: 'background的使用技巧', link: '/CSS/background'}
          ],
          collapsed: true
        }
      ],
      '/vite': [
        {
          text: 'vite进化',
          items: [
            {text: '前端模块化', link: '/vite/module'},
            {text: '用vite搭建一个项目', link: '/vite/firstBuild'}
          ],
          collapsed: true
        }
      ]
    },
    docFooter: { prev: '上一篇', next: '下一篇' }
  },
});
