'use strict'; // 严格模式

/**
 * @description 数据库数据配置成接口文档,供前台UI页面调用
 * 要和router.js配合使用, 完成后可在相应的url测试
 */

const Controller = require('egg').Controller;

class HomeController extends Controller {
	async index() {
		this.ctx.body = 'ericy的前台UI接口url'
	}

	async getArticleList() {

		// 对数据库的数据进行处理(sql语句)
		let sql = 'SELECT article.id as id,' +
			'article.title as title,' +
			'article.introduce as introduce,' +
			"FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s') as addTime," +
			'article.view_count as view_count ,' +
			'.type.typeName as typeName ' +
			'FROM article LEFT JOIN type ON article.type_id = type.Id'

		// 得到数据内容方法
		const results = await this.app.mysql.query(sql) // query 高级查询,能够得到查询结果
		this.ctx.body = { data: results }
	}

	async getArticleById() {
		let id = this.ctx.params.id // 获得文章id(前端传递过来)

		let sql = 'SELECT article.id as id ,' +
			'article.title as title ,' +
			'article.introduce as introduce ,' +
			'article.article_content as article_content ,' +
			"FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s') as addTime ," +
			'article.view_count as view_count ,' +
			'type.typeName as typeName ,' +
			'type.id as typeId ' +
			'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
			'WHERE article.id= ' + id

		const result = await this.app.mysql.query(sql)
		this.ctx.body = { data: result } // 得到返回的数据内容
	}

	// 得到类别名称和编号
	async getTypeInfo() {
		const result = await this.app.mysql.select('type')
		this.ctx.body = { data: result }
	}

	// 根据类别ID(header nav)获得文章列表
	async getListById() {
		const id = this.ctx.params.id
		let sql = 'SELECT article.id as id,' +
			'article.title as title,' +
			'article.introduce as introduce,' +
			"FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s') as addTime," +
			'article.view_count as view_count ,' +
			'.type.typeName as typeName ' +
			'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
			'WHERE type_id=' + id

		const results = await this.app.mysql.query(sql)
		this.ctx.body = { data: results }
	}
}

module.exports = HomeController;


/**
 * @param {*} admin文件夹 前台展示页面接口
 * @param {*} dafault文件夹 后台管理系统接口
 * @param {*} RESTful规则接口类型 POST新建资源 GET获取资源 PUT更新资源 DELETE删除资源
 */
