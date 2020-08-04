// 对请求接口地址做统一管理

let ipUrl = 'http://127.0.0.1:7001/default/'

let servicePath = {
	getArticleList: ipUrl + 'getArticleList', // 首页接口
	getArticleById: ipUrl + 'getArticleById/', // 文章详细页 接口
	getTypeInfo: ipUrl + 'getTypeInfo', // 获取文章类别 接口
	getListById: ipUrl + 'getListById/' // 类别ID获得文章列表接口
}

export default servicePath;