import React, { useState } from 'react';
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import { Row, Col, List, Icon } from 'antd';

import Header from '../components/Header';
import Author from '../components/Author';
import Advert from "../components/Advert";
import Footer from "../components/Footer";
import "../public/style/pages/index.css";
import servicePath from '../config/apiUrl';

import marked from 'marked'  // 解析markdown的代码
import hljs from 'highlight.js' // 代码高亮
import "highlight.js/styles/monokai-sublime.css"

// 首页
const Home = (list) => {
	const [mylist, setMylist] = useState(list.data)

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
				<title>首页</title>
			</Head>

			<Header />

			<Row className="comm-main" justify="center" type="flex">
				<Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
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
									<span><Icon type="yuque" /> {item.addTime}</span>
									<span><Icon type="alibaba" /> {item.typeName}</span>
									<span><Icon type="reddit" /> {item.view_count}人</span>
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

Home.getInitialProps = async () => {
	const promise = new Promise(resolve => {
		axios.get(servicePath.getArticleList).then(res => {
			// console.log('Home res.data', res.data);
			resolve(res.data)
		})
	})
	return await promise
}

export default Home

/**
 *  @param {*} getInitialProps
 * 是Next.js的语法，它确立了一个规范，
 * 一个页面组件只要把访问 API 外部资源的代码放在 getInitialProps 中就足够，
 * 其余的不用管，Next.js 自然会在服务器端或者浏览器端调用 getInitialProps
 * 来获取外部资源，并把外部资源以 props 的方式传递给页面组件。
 *  @see https://blog.csdn.net/gwdgwd123/article/details/85030708
 */
