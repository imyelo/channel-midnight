# channel-midnight

## 如何开始
### Ubuntu
1. 安装 libasound2-dev

	```sh
	sudo apt-get install libasound2-dev
	```

2. 安装 nodejs 及 make

3. 安装 node-dev 及 gulp

	```sh
    npm i -g node-dev gulp
    ```

4. 安装依赖包

	```sh
	npm i
	cd src/static && npm i
	```

### OSX
1. 安装 nodejs 及 make

2. 安装 node-dev 及 gulp

	```sh
    npm i -g node-dev gulp
    ```

3. 安装依赖包

	```sh
	npm i --mpg123-backend=openal
	cd src/static && npm i
	```

## 以调试模式启动
1. 开启前端文件实时编译

	```sh
	cd src/static && gulp
	```

2. 启动服务端

	```sh
	make dev
	```

## 部署正式环境
### 编译打包
```sh
make build
```

### 正式环境运行
```sh
make server
```
