import React from 'react';
import { Layout, Menu, Input, Icon, Badge } from 'antd';
import StoreCard from "../StoreCard/StoreCard"
import ClassStore from '../../utils/dataStore'
import FooterAll from '../FooterAll/FooterAll';
import { Link } from 'react-router-dom';
import "./index.css";


const { SubMenu } = Menu;
const { Search } = Input;
const { Header, Content, Sider, Footer } = Layout;
const routeMap = {}
const currentPage = document.location.hash.replace(/#\/?/, "");
const CurrentPage = routeMap[currentPage] || StoreCard;
const Paths = {
    logoPath: './src/images/logo.png'
}


class HeaderIndex extends React.Component {
    constructor(props) {
        super(props);
    }
    //解决内存泄漏问题
    componentWillUnmount = () => {
        this.setState = (state,callback)=>{
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

function SideBar(props) {
    return (
        <div className="siderHeight">
            <Sider style={{ background: '#fff' }}>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={[ClassStore[0].key]}
                    defaultOpenKeys={[ClassStore[0].data[0].key]}
                    style={{ height: '100%', borderRight: 0 }}
                >

                    {Object.keys(ClassStore).map(key => (
                        <SubMenu
                            key={ClassStore[key].key}
                            title={
                                <span>
                                    {ClassStore[key].name}
                                </span>
                            }
                        >
                            {Object.keys(ClassStore[key].data).map(item => (
                                <Menu.Item onClick={() => props.func(key, item)} key={ClassStore[key].data[item].key}>{ClassStore[key].data[item].dataName}</Menu.Item>
                            ))}
                        </SubMenu>
                    ))}
                </Menu>

            </Sider>
        </div>
    );
}


class SiderPage extends React.Component {
    constructor(props) {
        super(props);
    }
    //解决内存泄漏问题
    componentWillUnmount = () => {
        this.setState = (state,callback)=>{
          return;
        };
    }
    render() {
        return (
            <Layout style={{ padding: '0 24px 24px' }}>
                <Content
                    style={{
                        background: '#fff',
                        padding: 24,
                        margin: 10,
                        minHeight: 280,
                    }}
                >

                    <CurrentPage data={this.props.data} onClose={this.props.onClose} cardload={this.props.cardload} />
                </Content>
            </Layout>
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                key: '0',
                item: '0'
            },
            cardload: false
        }
    }
    //解决内存泄漏问题
    componentWillUnmount = () => {
        this.setState = (state,callback)=>{
          return;
        };
    }
    SiderClick = (key, item) => {
        this.setState({
            data: {
                key: key,
                item: item
            }
        })
        console.log(this.state);
        this.forceUpdate();
    }

    ShowTemp = (e) => {
        this.setState({
            cardload: true
        })
        this.forceUpdate();
    }
    onClose = () => {
        this.setState({
            cardload: false
        })
        this.forceUpdate();
    }
    badge = (value) => {
        console.log(value);
    }

    render() {
        return (
            <Layout>
                <HeaderIndex ShowTemp={this.ShowTemp} />
                <Layout>
                    <SideBar func={this.SiderClick} />
                    <SiderPage data={this.state.data} badge={this.badge} onClose={this.onClose} cardload={this.state.cardload} />
                </Layout>
                <Footer>
                    < FooterAll />
                </Footer>
            </Layout>
        );
    }
}

export default App;