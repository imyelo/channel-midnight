# channel-midnight

## 如何开始
### 准备
1. 安装 libasound2-dev

	```sh
	sudo apt-get install libasound2-dev
	```

2. 安装 nodejs 及 make

3. 安装 node-dev 及 gulp

	```sh
    npm i -g node-dev gulp
    ```

4. 安装 yarn

	```sh
	npm i -g yarn
	```

5. 安装依赖包

	```sh
	yarn
	cd src/static && yarn
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


## 如何运行开发环境
1. 开启前端文件实时编译

	```sh
	cd src/static && gulp
	```

2. 启动服务端

	```sh
	make dev
	```
