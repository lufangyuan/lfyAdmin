### 项目介绍
基于vue3 + TypeScript + vite + element-plus构建的管理后台的基础框架，有基本的登录，菜单栏，导航栏，tagView等，可以在此基础上进行开发
#### 安装
`npm install`
####运行
`npm run dev`
####打包
`npm run build:prod`
###菜单配置
菜单和面包屑都是通过配置路由自动生成的，路由文件中有案例和说明
###接口配置
开发时的接口在vite.config.json中配置，生成环境和测试环境的接口在环境变量文件（.env.production和.env.staging）中配置
###开发时的一些弄好的配置
- element-plus组件自动引入，无需再手动引入了
- vue的API已自动引入，比如ref,watch等这些
- src/components/下的.vue文件可以自动引入
- 在style目录下的element-plus.scss中设置覆盖UI库的默认样式
- variables.module.scss设置左侧菜单的宽度和样式
