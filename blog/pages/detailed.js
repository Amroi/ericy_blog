import React, { useState } from 'react'
import Head from 'next/head'
import axios from 'axios';
// import ReactMarkdown from 'react-markdown';
// 实现markdown高亮效果,改用更成熟的marked+highlight.js插件
// import MarkNav from 'markdown-navbar';
// import "markdown-navbar/dist/navbar.css"

import marked from 'marked'  // 解析markdown的代码
import hljs from 'highlight.js' // 代码高亮
import "highlight.js/styles/monokai-sublime.css"

import { Row, Col, Breadcrumb, Affix, Icon } from 'antd'

import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import '../public/style/pages/detailed.css'
import Tocify from '../components/tocify.tsx'
import servicePath from '../config/apiUrl';

/**
 * @param renderer 这个是必须填写的，你可以通过自定义的Renderer渲染出自定义的格式
 * @param gfm 启动类似Github样式的Markdown,填写true或者false
 * @param pedatic 只解析符合Markdown定义的，不修正Markdown的错误。填写true或者false
 * @param sanitize 原始输出，忽略HTML标签，这个作为一个开发人员，一定要写flase
 * @param tables 支持Github形式的表格，必须打开gfm选项
 * @param breaks 支持Github换行符，必须打开gfm选项，填写true或者false
 * @param smartLists 优化列表输出，这个填写ture之后，你的样式会好看很多，所以建议设置成ture
 * @param highlight 高亮显示规则 ，这里我们将使用highlight.js来完成
 */

// 某篇文章的详情页
const Detailed = (props) => {
	const tocify = new Tocify(); // 右侧的文章导航
	const renderer = new marked.Renderer() // 声明marked

	renderer.heading = (text, level, raw) => {
		const anchor = tocify.add(text, level) // 文本 标题 例如：### ericy
		return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`
	}

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

	let html = marked(props.article_content) // 转换接口中的数据为markedown格式
	return (
		<div>
			<Head>
				<title>博客详情页</title>
			</Head>

			<Header />

			<Row className="comm-main" justify="center" type="flex">
				<Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
					<div>
						<div className="bread-div">
							<Breadcrumb>
								<Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
								<Breadcrumb.Item>{props.typeName}</Breadcrumb.Item>
								<Breadcrumb.Item>{props.title}</Breadcrumb.Item>
							</Breadcrumb>
						</div>


						<div>
							<div className="detailed-title">
								{props.title}
							</div>

							<div className="list-icon center">
								<span><Icon type="calendar" /> {props.addTime}</span>
								<span><Icon type="folder" /> {props.typeName}</span>
								<span><Icon type="fire" /> {props.view_count}</span>
							</div>

							<div className="detailed-content"
								dangerouslySetInnerHTML={{ __html: html }}
							>
								{/*
								<ReactMarkdown
									source={markdown} // 渲染的数据
									escapeHtml={false} // html标签是否输出
								/>
								*/}
							</div>
						</div>

					</div>
				</Col>

				<Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
					<Author />
					<Advert />

					<Affix offsetTop={5}>
						<div className="detailed-nav comm-box">
							<div className="nav-title">文章目录</div>
							{/*
							<MarkNav
								className="article-menu"
								source={html}
								ordered={false} // 是否有编号
							/>
							*/}
							{tocify && tocify.render()}
						</div>
					</Affix>

				</Col>
			</Row>

			<Footer />
		</div>
	)
}

Detailed.getInitialProps = async (context) => {
	console.log('context.query.id', context.query.id);  // 此为从上级跳转目录传过来的id值

	let id = context.query.id
	const promise = new Promise(resolve => {
		axios.get(servicePath.getArticleById + id).then(res => {
			// console.log('Detailed res.data', res.data);
			resolve(res.data.data[0]) // 数组中对象中的第一个对象
		})
	})
	return await promise
}

export default Detailed


