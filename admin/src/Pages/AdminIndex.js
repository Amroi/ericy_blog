import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import AddArticle from './AddArticle';
import ArticleList from './ArticleList';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
	DesktopOutlined,
	PieChartOutlined,
	FileOutlined,
	UserOutlined,
} from '@ant-design/icons';
import "../static/css/AdminIndex.css"

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

/**
 * @param vh css3新特性,这里设置100vh可铺满整个浏览器比100%好用
 */

const AdminIndex = (props) => {

	const [collapsed, setCollapsed] = useState(false)

	const onCollapse = collapsed => {
		setCollapsed(collapsed);
	};

	const handleClickArticle = e => {
		if (e.key === 'addArticle') {
			props.history.push('/index/add')
		} else {
			props.history.push('/index/list')
		}
	}

	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
				<div className="logo" />
				<Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
					<Menu.Item key="1" icon={<PieChartOutlined />}>
						工作台
            		</Menu.Item>
					<Menu.Item key="2" icon={<DesktopOutlined />}>
						添加文章
            		</Menu.Item>
					<SubMenu key="sub1" icon={<UserOutlined />} onClick={handleClickArticle} title="文章管理">
						<Menu.Item key="addArticle">添加文章</Menu.Item>
						<Menu.Item key="articleList">文章列表</Menu.Item>
					</SubMenu>
					<Menu.Item key="9" icon={<FileOutlined />} >
						留言管理
					</Menu.Item>
				</Menu>
			</Sider>

			<Layout className="site-layout">

				<Content style={{ margin: '0 16px' }}>
					<Breadcrumb style={{ margin: '16px 0' }}>
						<Breadcrumb.Item>主页</Breadcrumb.Item>
						<Breadcrumb.Item>工作台</Breadcrumb.Item>
					</Breadcrumb>
					<div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
						<Switch>
							<Route path="/index" component={AddArticle} exact />
							<Route path="/index/add" component={AddArticle} exact />
							<Route path="/index/list" component={ArticleList} />
							<Route path="/index/add/:id" component={AddArticle} exact />
						</Switch>
					</div>
				</Content>
				<Footer style={{ textAlign: 'center' }}>Blog System ©2020 Created by Ericy</Footer>
			</Layout>
		</Layout>
	);

}

export default AdminIndex;