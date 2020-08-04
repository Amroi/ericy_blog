## service-项目中台文件夹

### 1). 技术简介：
	博客系统的服务端（或者叫做中台），采用Koa的上层框架egg.js，所谓上层框架就是在Koa的基础上，封装的框架

### 2). github网址: 
[https://github.com/eggjs/egg](https://github.com/eggjs/egg)

### 1. 创建文件
	npm init egg --type=simple

### 2. 安装依赖
	yarn 或 npm install

### 3. 启动服务
	yarn dev

### 4.文件解析
	app文件夹: 
	项目开发文件，程序员主要操作的文件，项目的大部分代码都会写在这里。
	config文件夹: 
	这个是整个项目的配置目录，项目和服务端的配置都在这里边进行设置。
	logs文件夹：
	日志文件夹，正常情况下不用修改和查看里边内容。
	node_modules: 
	项目所需要的模块文件，这个前端应该都非常了解，不多作介绍。
	run文件夹： 
	运行项目时，生成的配置文件，基本不修改里边的文件。
	test文件夹： 
	测试使用的配合文件，这个在测试时会使用。
	.autod.conf.js:  
	egg.js自己生成的配置文件，不需要进行修改。
	eslinttrc和eslintignore： 
	代码格式化的配置文件。
	gitgnore： 
	git设置忽略管理的配置文件。
	package.json： 
	包管理和命令配置文件，这个文件经常进行配置。