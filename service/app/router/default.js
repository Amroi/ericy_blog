// const { app } = require("egg-mock");

/**
 * @param {get()里的参数} 路由地址 文件夹.文件名.方法
 */

module.exports = app => {
	const { router, controller } = app
	router.get('/default/index', controller.default.home.index)
	router.get('/default/getArticleList', controller.default.home.getArticleList)
	router.get('/default/getArticleById/:id', controller.default.home.getArticleById)
	router.get('/default/getTypeInfo', controller.default.home.getTypeInfo)
	router.get('/default/getListById/:id', controller.default.home.getListById)
}