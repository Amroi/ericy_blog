'use strict'; // 严格模式

/**
 * @description 数据库数据配置成接口文档,供后台UI页面调用
 * 要和router.js配合使用, 完成后可在相应的url测试
 */

const Controller = require('egg').Controller

class MainController extends Controller {
	async index() {
		this.ctx.body = 'ericy的后台UI接口url'
	}

	async checkLogin() {
		let userName = this.ctx.request.body.userName
		let password = this.ctx.request.body.password
		const sql = " SELECT userName FROM admin_user WHERE userName = '" + userName + "' AND password = '" + password + "' "
		const res = await this.app.mysql.query(sql)

		if (res.length > 0) {
			let openId = new Date().getTime() // 设定的token值？
			this.ctx.session.openId = { "openId": openId }
			this.ctx.body = { 'data': '登录成功', 'openId': openId }
		} else {
			this.ctx.body = { 'data': '登录失败' }
		}
	}

	async getTypeInfo() {
		const resType = await this.app.mysql.select('type') // 取出相关的数据
		this.ctx.body = { data: resType } // 放进接口对象中,然后配置接口路由
	}

	// 添加文章
	async addArticle() {
		let tmpArticle = this.ctx.request.body // 读取数据
		const result = await this.app.mysql.insert('article', tmpArticle) // 插入tmpArticle数据到表article的方法
		const insertSuccess = result.affectedRows === 1 // 判断是否插入成功
		const insertId = result.insertId // 插入的Id,可判断是修改还是保存

		this.ctx.body = {
			isScuccess: insertSuccess,
			insertId: insertId
		}
	}

	// 更新文章
	async updateArticle() {
		let tempArticle = this.ctx.request.body

		const result = await this.app.mysql.update('article', tempArticle)
		const updateSuccess = result.affectedRows === 1
		this.ctx.body = {
			isScuccess: updateSuccess
		}
	}

	//获得文章列表
	async getArticleList() {
		let sql = 'SELECT article.id as id,' +
			'article.title as title,' +
			'article.introduce as introduce,' +
			"FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime," +
			'article.view_count as view_count ,' +
			'type.typeName as typeName ' +
			'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
			'ORDER BY article.id DESC'

		const resList = await this.app.mysql.query(sql)
		this.ctx.body = { list: resList }
	}

	// 删除文章
	async delArticle() {
		let id = this.ctx.params.id // 删除某篇文章需要其id
		const res = await this.app.mysql.delete('article', { 'id': id })
		this.ctx.body = { data: res }
	}

	//根据文章ID得到文章详情，用于修改文章
	async getArticleById() {
		let id = this.ctx.params.id;

		let sql = 'SELECT article.id as id,' +
			'article.title as title,' +
			'article.introduce as introduce,' +
			'article.article_content as article_content,' +
			"FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
			'article.view_count as view_count ,' +
			'type.typeName as typeName ,' +
			'type.id as typeId ' +
			'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
			'WHERE article.id=' + id

		const result = await this.app.mysql.query(sql)
		this.ctx.body = { data: result }
	}
}

module.exports = MainController