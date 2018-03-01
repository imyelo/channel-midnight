# channel-midnight
> :crescent_moon: :radio: 每个熬夜加班的团队都值得拥有的午夜电台

![screenshot](https://i.loli.net/2018/02/27/5a95679aad550.png)

## 如何开始
1. 安装 libao

	- Debian

		```sh
		sudo apt-get install libao-dev
		```

	- OSX

		```sh
		sudo brew install libao
		```

2. 安装 nodejs

3. 安装 node-dev 及 gulp

	```sh
    npm i -g node-dev gulp
    ```

4. 安装依赖包

	```sh
	npm i # 后端依赖包
	cd src/static && npm i # 前端依赖包
	```

## 如何运行
### 正式环境
1. 编译打包

	```sh
	npm run build
	```

2. 启动服务端

	```sh
	npm run server
	```

### 调试模式
1. 开启前端文件实时编译

	```sh
	cd src/static && npm start
	```

2. 启动服务端

	```sh
	npm start
	```

## 听说你有一个 Idea
[提交到 Trello](https://trello.com/b/HXu2z0rO/channel-midnight-todo)

## License
The MIT License

### Favicon License
Icons made by [Vectors Market](https://www.flaticon.com/authors/vectors-market) from [www.flaticon.com](https://www.flaticon.com/) is licensed by [CC 3.0 BY](http://creativecommons.org/licenses/by/3.0/)
