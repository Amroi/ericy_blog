/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
	/**
	 * built-in config
	 * @type {Egg.EggAppConfig}
	 **/
	const config = exports = {};

	// use for cookie sign key, should change to your own and keep security
	config.keys = appInfo.name + '_1596081787277_247';

	// add your middleware config here
	config.middleware = [];

	// add your user config here
	const userConfig = {
		// myAppName: 'egg',
	};

	config.mysql = {
		// 数据库配置
		client: {
			// 服务器地址(一般为本地)
			host: 'localhost',
			// 端口
			port: '3306',
			// 数据库登录用户名
			user: 'root',
			// 密码
			password: '12345678',
			// 建立的数据名称
			database: 'ericy_blog',
		},
		// load into app, default is open
		app: true,
		// load into agent, default is close
		agent: false,
	};

	config.security = {
		csrf: { enable: false }, // egg提供的安全机制,默认开启(true)
		domainWhiteList: ['*'] // 白名单(所有)
	}

	config.cors = {
		origin: 'http://localhost:3000',	// 允许哪些域名可以跨域访问(所有)
		credentials: true, // 允许cookie跨域(很不安全的做法)
		allowMethods: 'GET,HEAD,PUT,POST,DELETE,OPTIONS' // 哪些请求可以跨域访问
	}

	return {
		...config,
		...userConfig,
	};
};
