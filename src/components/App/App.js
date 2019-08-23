import React from 'react';
import {
    Layout,
    Menu,
    Input,
    Icon,
    message,
    Tag,
    Modal,
    Button,
    Spin
} from 'antd';
import StoreCard from "../StoreCard/StoreCard"
import ClassStore from '../../utils/dataStore'
import FooterAll from '../FooterAll/FooterAll';
import FeedBack from '../../components/FeedBack/FeedBack'
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
        if (localStorage.getItem('adminNumLoS')) {
            this.state = {
                adminIndex: true
            }
        } else {
            this.state = {
                adminIndex: false
            }
        }

    }
    state = {
        loading: false,
        visible: false
    };
    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 3000);
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };
    del() {
        this.setState({
            adminIndex: false
        })
        localStorage.removeItem('adminNumLoS')
        message.success('注销成功')
    }
    //解决内存泄漏问题
    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return;
        };
    }
    render() {
        const { visible, loading } = this.state;
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
                            <Menu.Item disabled={this.state.adminIndex} key="1">
                                <Link to="/login">你好！请登录 </Link>
                            </Menu.Item>
                            <Menu.Item disabled={this.state.adminIndex} key="2">
                                <Link to="/register">免费注册</Link></Menu.Item>
                            <Menu.Item disabled={!this.state.adminIndex} key="3" onClick={(e) => this.props.ShowTemp(e)}><Icon type="account-book" />

                                我的换书箱
                            </Menu.Item>
                            <Menu.Item disabled={!this.state.adminIndex} key="4" onClick={(e) => this.del()}>
                                注销</Menu.Item>
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
                        <div style={{ width: 30, marginLeft: 10 }}>
                            <Tag color="orange" onClick={this.showModal}>反馈</Tag>
                        </div>
                        <div style={{ width: 100, marginLeft: 20 }}>
                            <Tag color="orange" onClick={() => this.props.nav()} >
                                管理员登录
                            </Tag>
                        </div>
                    </div>
                </div>
                <Modal
                    visible={visible}
                    title="反馈"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            取消
            </Button>,
                        <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                            提交反馈
            </Button>,
                    ]}
                >
                    <FeedBack />
                </Modal>
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
        this.setState = (state, callback) => {
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
            cardload: false,
            loading: false
        }
    }

    //解决内存泄漏问题
    componentWillUnmount() {
        this.setState = (state, callback) => {
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
    nav = () => {
        this.setState({
            loading: true
        })
        setTimeout(() => {
            this.setState({
                loading: false
            })
            message.success('登录成功')
            this.props.history.push('/admin');
        }, 1000)
    }

    render() {
        return (
            <Spin tip="Loading..." spinning={this.state.loading}>
                <Layout>
                    <HeaderIndex ShowTemp={this.ShowTemp} nav={this.nav} />
                    <Layout>
                        <SideBar func={this.SiderClick} />
                        <SiderPage data={this.state.data} onClose={this.onClose} cardload={this.state.cardload} />
                    </Layout>
                    <Footer>
                        < FooterAll />
                    </Footer>
                </Layout>
            </Spin>
        );
    }
}

export default App;