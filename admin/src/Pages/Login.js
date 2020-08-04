import React, { useState } from 'react';
import { Card, Input, Button, Spin, message } from 'antd';
import { UserOutlined, KeyOutlined } from '@ant-design/icons'
import servicePath from '../config/apiUrl';
import "../static/css/Login.css"
import axios from 'axios';


const Login = (props) => {
	const [userName, setUserName] = useState('')
	const [password, setPassword] = useState('')
	const [isLoading, setInLoading] = useState(false)

	const checkLogin = () => {
		console.log('userName password', userName, password);
		setInLoading(true);

		if (!userName) {
			message.error('用户名不能为空！')
			setTimeout(() => {
				setInLoading(false);
			}, 500)
			return false;
		} else if (!password) {
			message.error('密码不能为空！')
			setTimeout(() => {
				setInLoading(false);
			}, 500)
			return false;
		}
		let dataProps = {
			'userName': userName,
			"password": password
		}

		axios({
			method: 'post',
			url: servicePath.checkLogin,
			data: dataProps,
			withCredentials: true // (前后端)共享session
		}).then(res => {
			setInLoading(false)
			if (res.data.data === '登录成功') {
				message.success('登录成功！')
				localStorage.setItem('openId', res.data.openId)
				props.history.replace('/index')
			} else {
				message.error('用户名或者密码错误！')
			}
		})

	}

	return (
		<div className="login-div">
			<Spin tip="加载中..." spinning={isLoading}>
				<Card title="Ericy Blog System" style={{ width: 400 }} bordered={true}>
					<Input
						defaultValue={userName}
						placeholder="Enter your username"
						id="userName"
						prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
						onChange={e => setUserName(e.target.value)}
					/>
					<br /><br />
					<Input.Password
						defaultValue={password}
						placeholder="Enter your password"
						id="password"
						prefix={<KeyOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
						onChange={e => setPassword(e.target.value)}
					/>
					<br /><br />
					<Button type="primary" block onClick={checkLogin}>
						Login in
					</Button>
				</Card>
			</Spin>
		</div>
	)
}

export default Login;