'use strict';

/** @type Egg.EggPlugin */
/*
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
};
*/

// 连接mysql数据库(模块: egg-mysql)
exports.mysql = {
	enable: true, // 需要使用
	package: 'egg-mysql' // 模块
}

// 进行跨域访问(模块: egg-cors)
exports.cors = {
	enable: true,
	package: 'egg-cors'
}
