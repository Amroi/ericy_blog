import React, { useState, useEffect } from 'react';
import '../static/css/ArticleList.css'
import { List, Row, Col, Modal, message, Button, Switch } from 'antd';
import axios from 'axios'
import servicePath from '../config/apiUrl'

const { confirm } = Modal;

const ArticleList = props => {
	const [list, setList] = useState([])

	useEffect(() => {
		getArticleList()
	}, [])

	const getArticleList = () => {
		axios({
			method: 'get',
			url: servicePath.getArticleList,
			withCredentials: true,
		}).then(res => {
			setList(res.data.list)
		})
	}

	// 删除文章
	const delArticle = (id) => {
		confirm({
			title: '确定要删除这篇文章吗?',
			content: '删除后将无法恢复,请谨慎操作！',
			onOk() {
				axios({
					method: 'get',
					withCredentials: true,
					url: servicePath.delArticle + id
				}).then(res => {
					message.success('文章删除成功')
					getArticleList()
				})
			}
		})
	}

	// 修改文章跳转(到添加页面但映射内容)方法
	const updateArticle = (id) => {
		props.history.push('/index/add/' + id)
	}

	return (
		<div>
			<List
				header={
					<Row className="list-div">
						<Col span={10}>
							<b>标题</b>
						</Col>
						<Col span={4} style={{ paddingLeft: 12 }}>
							<b>类别</b>
						</Col>
						<Col span={4} style={{ paddingLeft: 30 }}>
							<b>发布时间</b>
						</Col>
						<Col span={2}>
							<b>浏览量</b>
						</Col>
						<Col span={4} style={{ paddingLeft: 50 }}>
							<b>操作</b>
						</Col>
					</Row>
				}
				bordered
				dataSource={list}
				renderItem={item => (
					<List.Item>
						<Row className="list-div">
							<Col span={10}>
								{item.title}
							</Col>
							<Col span={4}>
								{item.typeName}
							</Col>
							<Col span={4}>
								{item.addTime}
							</Col>
							<Col span={2}>
								{item.view_count}
							</Col>
							<Col span={4}>
								<Button type="primary" onClick={() => updateArticle(item.id)}>修改</Button>&nbsp;
						 		<Button danger onClick={() => delArticle(item.id)}>删除</Button>
							</Col>
						</Row>
					</List.Item>
				)}
			/>
		</div>
	)
}

export default ArticleList