import { Avatar, Divider, Icon } from 'antd';
// import { GithubOutlined, QqOutlined, WechatOutlined } from '@ant-design/icons';
import "../public/style/components/author.css"

const Author = () => {
	return (
		<div className="author-div comm-box">
			<div><Avatar size={100} src="https://avatars1.githubusercontent.com/u/58652041?s=60&v=4" /></div>
			<div className="author-introduction">
				切图前端攻城狮，专注于切图一年有载。集切图和布局于一身的菜鸟型选手，望各位大佬多多指教！
				<Divider>社交账号</Divider>
				<Avatar size={28} icon="github" className="account" />
				<Avatar size={28} icon="qq" className="account" />
				<Avatar size={28} icon="wechat" className="account" />
			</div>
		</div>
	)
}

export default Author;
