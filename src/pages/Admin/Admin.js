import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Input, Icon, Badge } from 'antd';
import FooterAll from '../../components/FooterAll/FooterAll';
import AdminPage from '../../components/AdminPage/AdminPage';
import './index.css';

const { SubMenu } = Menu;
const { Search } = Input;
const { Header, Content, Sider } = Layout;
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
            <div className="header-login-row">
                <div>
                    <a href="/#/">
                        <img src='./src/images/logo.png' />
                    </a>
                </div>
                <div className="header-login-name">
                    管理员
            </div>
            </div>
        );
    }
}

class Admin extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Layout>
                <Header className="header">
                    <HeaderIndex />
                </Header>
                <Layout>
                    <Sider width={200} style={{ background: '#fff' }}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            <SubMenu
                                key="sub1"
                                title={
                                    <span>
                                        <Icon type="user" />
                                        用户管理
              </span>
                                }
                            >
                                <Menu.Item key="1">普通用户</Menu.Item>
                                <Menu.Item key="2">管理员</Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key="sub2"
                                title={
                                    <span>
                                        <Icon type="account-book" />
                                        订单管理
              </span>
                                }
                            >
                                <Menu.Item key="5">发货中</Menu.Item>
                                <Menu.Item key="6">未发货</Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key="sub3"
                                title={
                                    <span>
                                        <Icon type="notification" />
                                        用户反馈
              </span>
                                }
                            >
                                <Menu.Item key="9">用户举报</Menu.Item>
                                <Menu.Item key="10">用户意见</Menu.Item>
                                <Menu.Item key="11">发现漏洞</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Content
                            style={{
                                background: '#fff',
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                            <AdminPage />
                        </Content>
                    </Layout>
                </Layout>
                < FooterAll />
            </Layout>
        );
    };
}

export default Admin;