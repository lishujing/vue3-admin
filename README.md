# vue3-admin

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



### 项目部署
```
|-- distProd
|   |-- data_pages  ## 用于存放大屏项目打包之后的静态文件（上线后通过 /data_pages/#/ 访问）
|   |   |-- static ## 大屏项目静态文件夹
|   |   |-- favicon.ico
|   |   |-- index.html ## 大屏项目入口文件
|   |
|   |-- H5  ## 用于存放H5自定义项目打包之后的静态文件（上线后通过 /H5/#/ 访问）
|   |   |-- css
|   |   |-- fonts
|   |   |-- img
|   |   |-- js
|   |   |-- favicon.ico
|   |   |-- index.html ## H5自定义项目入口文件
|   |
|   |-- css
|   |-- fonts
|   |-- img
|   |-- js
|   |-- favicon.ico
|   |-- index.html ## 该项目入口文件

ps: 打包之后，可以 cd distProd 文件夹，执行 anywhere -p 6996(端口号，可自定义)
并访问地址检测打包时候成功

注意: 放置打包文件的目录名需要与打包时候的静态文件名一样
```
