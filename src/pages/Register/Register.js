import React from 'react';
import { Form, Icon, Input, Button, Layout } from 'antd';
import FooterAll from '../../components/FooterAll/FooterAll';
import './index.css'

const { Header, Content, Footer } = Layout;

const HeaderRegister = () => {
    return (
        <div className="header-login-row">
            <div>
                <a href="/#/">
                    <img src='./src/images/logo.png' />
                </a>
            </div>
            <div className="header-login-name">
                欢迎注册
            </div>
        </div>
    );
}

const MainRegister = (props) => {
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
                    <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="您的密码"
                    />,
            </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log up
</Button>
                    Or <a href="/#/login">Log in!</a>
                </Form.Item>
            </Form>
        </div>
    );
}

class Login extends React.Component {
    render() {
        return (
            <Layout>
                <Header className="header">
                    <HeaderRegister />
                </Header>
                <Layout>
                    <Content>
                        <MainRegister />
                    </Content>
                </Layout>
                <Footer>
                    < FooterAll />
                </Footer>
            </Layout>
        )
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_register' })(Login);

export default WrappedNormalLoginForm;