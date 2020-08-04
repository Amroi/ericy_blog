import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import { Row, Col, List, Breadcrumb, Icon } from 'antd';

import Header from '../components/Header';
import Author from '../components/Author';
import Advert from "../components/Advert";
import Footer from "../components/Footer";

import axios from 'axios';
import ServicePath from '../config/apiUrl';
import Link from 'next/link'

import marked from 'marked'  // 解析markdown的代码
import hljs from 'highlight.js' // 代码高亮
import "highlight.js/styles/monokai-sublime.css"

// 列表页
const MyList = (list) => {
	const [mylist, setMylist] = useState(list.data) // list实则为res.data
	useEffect(() => {
		setMylist(list.data)
	})

	const renderer = new marked.Renderer() // 声明marked
	marked.setOptions({
		renderer: renderer,
		gfm: true,
		pedantic: false,
		sanitize: false,
		tables: true,
		breaks: false,
		smartLists: true,
		highlight: (code) => {
			return hljs.highlightAuto(code).value
		}
	})


	return (
		<div>
			<Head>
				<title>列表页</title>
			</Head>

			<Header />

			<Row className="comm-main" justify="center" type="flex">
				<Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
					<div className="bread-div">
						<Breadcrumb>
							<Breadcrumb.Item><a href="/">首页</a> </Breadcrumb.Item>
							<Breadcrumb.Item>视频教程</Breadcrumb.Item>
						</Breadcrumb>
					</div>

					<List
						header={<div>最新日志</div>}
						itemLayout="vertical"
						dataSource={mylist}
						renderItem={item => (
							<List.Item>
								<div className="list-title">
									<Link href={{ pathname: '/detailed', query: { id: item.id } }}>
										<a>{item.title}</a>
									</Link>
								</div>
								<div className="list-icon">
									<span><Icon type="yuque" />{item.addTime}</span>
									<span><Icon type="alibaba" />{item.typeName}</span>
									<span><Icon type="reddit" />{item.view_count}人</span>
								</div>
								<div className="list-context"
									dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}></div>
							</List.Item>
						)}
					/>
				</Col>
				<Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
					<Author />
					<Advert />
				</Col>
			</Row>


			<Footer />
		</div>
	)
}

/**
 * @param {*} context 通过上一个路由传递的上下文文件
 */
MyList.getInitialProps = async (context) => {
	let id = context.query.id

	const promise = new Promise(resolve => {
		axios.get(ServicePath.getListById + id).then(res => {
			resolve(res.data)
		})
	})
	return await promise
}

export default MyList


