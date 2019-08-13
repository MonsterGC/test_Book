import React, { Component } from 'react';
import { render } from 'react-dom';
import { Layout, Menu } from 'antd';
import StoreCard from "./StoreCard"
import ClassStore from './Data/dataStore'
import "./styles/css/index.css";


const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const routeMap = {

}


class App extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                key : '0',
                item : '0'
            }
        }
    }

    SiderClick = (key,item) => {
        this.state.data = {
            key : key,
            item : item
        };
        this.forceUpdate();
    }

    render() {
        const currentPage = document.location.hash.replace(/#\/?/, "");
        let CurrentPage = routeMap[currentPage] || StoreCard;
        // 页面高度

        return (
            <Layout>
                <Header className="header">
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
                </Header>
                <Layout>
                    <div className="siderHeight">
                        <Sider width={200} style={{ background: '#fff' }}>
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
                                            <Menu.Item onClick={() => this.SiderClick(key,item)} key={ClassStore[key].data[item].key}>{ClassStore[key].data[item].dataName}</Menu.Item>
                                        ))}
                                    </SubMenu>
                                ))}
                            </Menu>

                        </Sider>
                    </div>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Content
                            style={{
                                background: '#fff',
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >

                            <CurrentPage data={this.state.data} />
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

render(<App />, document.getElementById("root"));