import React, { useState, useEffect } from 'react';
import marked from 'marked';
import axios from 'axios';
import moment from 'moment'
import servicePath from '../config/apiUrl';
import "../static/css/AddArticle.css";
import { Row, Col, Input, Select, Button, DatePicker, message } from 'antd'

const { Option } = Select;
const { TextArea } = Input

const AddArticle = (props) => {
	const [articleId, setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
	const [articleTitle, setArticleTitle] = useState('')   //文章标题
	const [articleContent, setArticleContent] = useState('')  //markdown的编辑内容
	const [markdownContent, setMarkdownContent] = useState('预览内容') //html展示的内容
	const [introducemd, setIntroducemd] = useState()  //简介的markdown内容
	const [introducehtml, setIntroducehtml] = useState('简介预览') //展示简介的html内容
	const [showDate, setShowDate] = useState()  //发布日期
	// const [updateDate, setUpdateDate] = useState() //修改日志的日期
	const [typeInfo, setTypeInfo] = useState([]) // 文章类别信息
	const [selectedType, setSelectType] = useState('选择文章类型') //选择的文章类别

	useEffect(() => {
		getTypeInfo()
		// 跟据是否有传id判断添加或者更新
		let tmpId = props.match.params.id
		if (tmpId) {
			setArticleId(tmpId)
			getArticleById(tmpId)
		}
	}, []) // componentDidMount

	marked.setOptions({
		renderer: new marked.Renderer(),
		gfm: true,
		pedantic: false,
		sanitize: false,
		tables: true,
		breaks: false,
		smartLists: true,
		smartypants: false,
	});

	// 映射文章内容(html的markdown形式)
	const changeContent = (e) => {
		setArticleContent(e.target.value)
		let html = marked(e.target.value)
		setMarkdownContent(html)
	}

	// 映射文章简介 
	const changeIntroduce = (e) => {
		setIntroducemd(e.target.value)
		let html = marked(e.target.value)
		setIntroducehtml(html)
	}

	// 获取文章类别名称
	const getTypeInfo = () => {
		axios({
			method: 'get',
			url: servicePath.getTypeInfo,
			withCredentials: true // 跨域检验cookies
		}).then(res => {
			if (res.data.data === '没有登录') {
				message.error('尚未登录！')
				localStorage.removeItem('openId')
				props.history.replace('/')
			} else {
				setTypeInfo(res.data.data)
			}
		})
	}

	// 添加/更新文章到数据库
	const saveArticle = () => {
		if (!selectedType) {
			message.error('文章类别不能为空')
			return false
		} else if (!articleTitle) {
			message.error('文章标题不能为空')
			return false
		} else if (!articleContent) {
			message.error('文章内容不能为空')
			return false
		} else if (!introducemd) {
			message.error('文章简介不能为空')
			return false
		} else if (!showDate) {
			message.error('发布日期不能为空')
			return false
		}

		let dataProps = {}   //传递到接口的参数
		dataProps.type_id = selectedType
		dataProps.title = articleTitle
		dataProps.article_content = articleContent
		dataProps.introduce = introducemd
		let datetext = showDate.replace('-', '/') //把字符串转换成时间戳
		dataProps.addTime = (new Date(datetext).getTime()) / 1000

		if (articleId === 0) {
			console.log('articleId=:' + articleId)
			dataProps.view_count = 0;
			axios({
				method: 'post',
				url: servicePath.addArticle,
				data: dataProps,
				withCredentials: true
			}).then(res => {
				setArticleId(res.data.insertId)
				if (res.data.isScuccess) {
					message.success('文章添加成功')
				} else {
					message.error('文章添加失败');
				}
			})
		} else {
			console.log('articleId:' + articleId)
			dataProps.id = articleId
			axios({
				method: 'post',
				url: servicePath.updateArticle,
				data: dataProps,
				withCredentials: true
			}).then(res => {
				if (res.data.isScuccess) {
					message.success('更新成功')
				} else {
					message.error('更新失败');
				}
			})
		}
	}

	// (如果是更新)获取文章详情
	const getArticleById = (id) => {
		axios(servicePath.getArticleById + id, { withCredentials: true }).then(res => {

			let articleInfo = res.data.data[0]
			setArticleTitle(articleInfo.title)
			setArticleContent(articleInfo.article_content)
			let html = marked(articleInfo.article_content)
			setMarkdownContent(html)
			setIntroducemd(articleInfo.introduce)
			let tmpInt = marked(articleInfo.introduce)
			setIntroducehtml(tmpInt)
			setShowDate(articleInfo.addTime)
			setSelectType(articleInfo.typeId)
		})
	}

	return (
		<Row gutter={5}>
			<Col span={18}>

				<Row gutter={10}>
					<Col span={20}>
						<Input placeholder="文章标题" value={articleTitle} onChange={e => setArticleTitle(e.target.value)} />
					</Col>
					<Col span={4}>
						<Select allowClear value={selectedType} style={{ width: 130 }} onChange={value => setSelectType(value)} placeholder="选择文章类别">
							{
								typeInfo.map(item => (
									<Option value={item.Id} key={item.Id}>
										{item.typeName}
									</Option>
								))
							}
						</Select>
					</Col>
				</Row>
				<br />
				<Row gutter={10}>
					<Col span={12}>
						<TextArea className="markdown-content" value={articleContent} rows={35} placeholder="文章内容" onChange={changeContent} />
					</Col>
					<Col span={12}>
						<div className="show-html" dangerouslySetInnerHTML={{ __html: markdownContent }}></div>
					</Col>
				</Row>

			</Col>

			<Col span={6}>
				<Row>
					<Col span={24}>
						<Button disabled>暂存文章</Button>&nbsp;
						<Button type="primary" onClick={saveArticle}>发布文章</Button>
						<br />
					</Col>
					<Col span={24}>
						<br />
						<TextArea rows={8} placeholder="文章简介" value={introducemd} onChange={changeIntroduce} />
						<br /><br />
						<div className="introduce-html" dangerouslySetInnerHTML={{ __html: introducehtml }}></div>
					</Col>
					<Col span={12}>
						<div className="date-select">
							<DatePicker
								value={moment(showDate)}
								placeholder="发布日期"
								onChange={(date, dateString) => { setShowDate(dateString) }} />
						</div>
					</Col>
				</Row>
			</Col>

		</Row>
	)
}

export default AddArticle