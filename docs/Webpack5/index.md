## 一、Webpack5的底层配置结构逻辑

#### 1、结构化理解webpack5配置项

webpack打包是非常复杂，但是大致上分为几个步骤

- 输入：从文件系统读入代码文件；
- 模块递归处理：调用Loader转译Module内容，将结果转化为AST，从中分析出模块的相互依赖的关系，进一步递归调用模块处理的过程，直到所有依赖文件都处理完成。
- 后处理：所有模块递归处理完毕后开始执行后处理，包括模块合并、注入运行时、产物优化等，最终输出 Chunk 集合；
- 输出：将Chunk写出到外部文件系统；

webpack配置项基本可以分为两类：流程类和工具类

与打包流程强相关的配置项：

- 输入输出：

   Entry： 用于定义项目入口文件

  context：项目执行上下文路径

  output：配置产出输出路径和名称

- 模块处理：

  resolve：用于配置模块路径解析规则

  module：用于配置模块加载规则

  externals：用于声明外部资源，Webpack 会直接忽略这部分资源，跳过这些资源的解析、打包操作

- 后处理：

  optimization：用于控制如何优化产物包体积，内置 Dead Code Elimination、Scope Hoisting、代码混淆、代码压缩等功能

  target：用于配置编译产物的目标运行环境，支持 web、node、electron 等值，不同值最终产物会有所差异

  mode：编译模式短句，支持development、production等值，可以理解为一种声明环境的短句。

  

  
