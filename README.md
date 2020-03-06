# vue template

> dist vue project template

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test

# build for production with deploy（部署测试环境）
npm run deploy:dev

# build for production with deploy（部署生产环境）
npm run deploy:prod
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


ui: vux
https://doc.vux.li/zh-CN/

vue-router:
https://router.vuejs.org/zh/


开发模式下  模拟数据与接口数据的转换
config>>dev.env.js
接口： ENV_CONFIG_REMOTE: '"1"', BASE_API: '"/api"',
模拟数据： ENV_CONFIG_REMOTE: '"0"', BASE_API: '"/static/data/"'

接口代理配置
config>>index.js  proxyTable 参数

其他配置信息 统一放在config文件夹下

