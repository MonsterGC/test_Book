import React from 'react';
import { Form, Icon, Input, Button, Layout } from 'antd';
import FooterAll from '../../components/FooterAll/FooterAll';
import './index.css'

const { Header, Content, Footer } = Layout;
const MainLogin = (props) => {
    return (
        <div className="main-login-content">
            <Form className="login-form">
                <Form.Item>
                    <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="您的邮箱"
                    />,
            </Form.Item>
                <Form.Item>
                    <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="您的密码"
                    />,
            </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
</Button>
                    Or <a target="_blank" href="/#/register">register now!</a>
                </Form.Item>
            </Form>
        </div>
    );
}

const HeaderLogin = () => {
    return (
        <div className="header-login-row">
            <div>
                <a href="/#/">
                    <img src='./src/images/logo.png' />
                </a>
            </div>
            <div className="header-login-name">
                欢迎登录
            </div>
        </div>
    );
}


class Login extends React.Component {
    render() {
        return (
            <Layout>
                <Header className="header">
                    <HeaderLogin />
                </Header>
                <Layout>
                    <Content>
                        <MainLogin />
                    </Content>
                </Layout>
                <Footer>
                    < FooterAll />
                </Footer>
            </Layout>
        )
    }
}
export default Login;