# Soda H5v1

## 如何开始
### 准备
1. 安装 nodejs 及 make
2. 安装 yarn

	```sh
    npm i -g yarn
    ```

3. 安装依赖包

	```sh
    yarn
    cd src/static && yarn
    ```

### 开发环境运行
1. 开启前端文件实时编译

	```sh
    cd src/static && gulp
    ```

2. 启动服务端

	```sh
    make dev
    ```

## 如何部署
### 编译打包
```sh
make build
```

### 正式环境运行
```sh
make server
```
