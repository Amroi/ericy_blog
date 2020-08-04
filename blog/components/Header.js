import React, { useEffect, useState } from 'react';
import "../public/style/components/header.css"
import { Row, Col, Menu, Icon } from 'antd';
import Router from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import servicePath from '../config/apiUrl'

const Header = () => {
	// 不选择使用getInitialProps是因为其不能用state和子组件不能使用getInitialProps
	const [navArray, setNavArray] = useState([])
	useEffect(() => {
		const fetchData = async () => {
			const result = await axios.get(servicePath.getTypeInfo).then(res => {
				return res.data.data
			})
			setNavArray(result)
		}
		fetchData()
	}, [])

	const handleClick = (e) => {
		if (e.key == 0) {
			Router.push('/')
		} else {
			Router.push('/list?id=' + e.key)
		}
	}

	return (
		<div className="header">
			<Row justify="center" type="flex">
				<Col xs={24} sm={24} md={8} lg={15} xl={8}>
					{/*  屏幕分辨率的适配问题 */}
					<span className="header-logo">
						<Link href={{ pathname: '/' }}>
							<a>Ericy</a>
						</Link>
					</span>
					<span className="header-txt">
						欢迎访问我的博客！既来之，休走之！
					</span>
				</Col>

				<Col xs={0} sm={0} md={16} lg={8} xl={10}>
					<Menu mode="horizontal" onClick={handleClick}>
						<Menu.Item key="0">
							<Icon type="home" />
							博客首页
						</Menu.Item>
						{
							navArray.map(item => (
								<Menu.Item key={item.Id} >
									<Icon type={item.icon} />
									{item.typeName}
								</Menu.Item>
							))
						}
					</Menu>
				</Col>
			</Row>
		</div>
	)
}

export default Header

/**
 *  @param xs: <576px响应式栅格。
 *  @param sm：≥576px响应式栅格.
 *  @param md: ≥768px响应式栅格.
 *  @param lg: ≥992px响应式栅格.
 *  @param xl: ≥1200px响应式栅格.
 *  @param xxl: ≥1600px响应式栅格.
 */