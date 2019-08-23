import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Layout, Search } from 'antd';
import "./index.css";
const { Search } = Input;
const { Header } = Layout;
const Paths = {
    logoPath: './src/images/logo.png'
}
class HeaderIndex extends React.Component {
    constructor(props) {
        super(props);
    }
    //解决内存泄漏问题
    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return;
        };
    }
    render() {
        return (
            <Header className="header">
                <div className="title-logo">
                    <div className="logo" >
                        <a href="/#/">
                            <img src={Paths.logoPath} width="80"></img>
                        </a>
                    </div>
                    <div>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            style={{ lineHeight: '64px' }}
                        >
                            <Menu.Item key="1">
                                <Link to="/login">你好！请登录 </Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link to="/register">免费注册</Link></Menu.Item>
                            <Menu.Item key="3" onClick={(e) => this.props.ShowTemp(e)}><Icon type="account-book" />

                                <Badge count={0}>
                                    我的换书箱
                                </Badge>
                            </Menu.Item>
                            <SubMenu
                                title={
                                    <span className="submenu-title-wrapper">
                                        <Icon type="user" />
                                        我的易购
            </span>
                                }
                            >
                                <Menu.Item key="user:1">待处理订单</Menu.Item>
                                <Menu.Item key="user:2">降价商品</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </div>
                    <div className="inputBook">
                        <div>
                            <Search
                                placeholder="今日百万每100减50"
                                onSearch={value => console.log(value)}
                                style={{ width: 200 }}
                            />
                        </div>
                        <div style={{ color: '#fff', width: 100, marginLeft: 10 }}>
                            <span>
                                我的购物车<Icon type="account-book" /></span>
                        </div>
                    </div>
                </div>
            </Header>
        );
    }
}

export default HeaderIndex;