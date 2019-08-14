import React, { Component } from 'react';
import { Layout, Menu, Input } from 'antd';
import StoreCard from "../StoreCard/StoreCard"
import ClassStore from '../../utils/dataStore'
import "./index.css";


const { SubMenu } = Menu;
const { Search } = Input;
const { Header, Content, Sider } = Layout;
const routeMap = {}
const currentPage = document.location.hash.replace(/#\/?/, "");
const CurrentPage = routeMap[currentPage] || StoreCard;
const Paths = {
    logoPath : './src/images/logo.png'
}

function HeaderIndex() {
    return (
        <Header className="header">
            <div className="title-logo">
                <div className="logo" >
                    <img src={Paths.logoPath} width="80"></img>
                </div>
                <div>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['1']}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="1">首页</Menu.Item>
                        <Menu.Item key="2">登录</Menu.Item>
                        <Menu.Item key="3">免费注册</Menu.Item>
                    </Menu>
                </div>
                <div className="inputBook">
                    <Search
                        placeholder="今日百万每100减50"
                        onSearch={value => console.log(value)}
                        style={{ width: 200 }}
                    />
                </div>
            </div>
        </Header>
    );
}

function SideBar(props) {
    return (
        <div className="siderHeight">
            <Sider  style={{ background: '#fff' }}>
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


function SiderPage(props) {
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

                <CurrentPage data={props.data} />
            </Content>
        </Layout>
    );
}




class App extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                key: '0',
                item: '0'
            }
        }
    }

    SiderClick = (key, item) => {
        this.state.data = {
            key: key,
            item: item
        };
        this.forceUpdate();
    }

    render() {

        return (
            <Layout>
                <HeaderIndex />
                <Layout>
                    <SideBar func = {this.SiderClick}/>
                    <SiderPage data={this.state.data} />
                </Layout>
            </Layout>
        );
    }
}

export default App;