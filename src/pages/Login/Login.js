import React from 'react';
import { Form, Icon, Input, Button, Layout } from 'antd';
import FooterAll from '../../components/FooterAll/FooterAll';
import './index.css'

const { Header, Content, Footer } = Layout;
const MainLogin = (props) => {
    return (
        <div className="main-login-content">
            <Form onSubmit={props.handleSubmit} className="login-form">
                <Form.Item>
                    {props.getFieldDecorator('email', {
                        rules: [{
                            required: true,
                            message: '邮箱不能为空',
                        }, {
                            message: '请输入正确的邮箱',
                            pattern: /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/
                        }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="您的邮箱"
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    {props.getFieldDecorator('password', {
                        rules: [{
                            required: true,
                            message: '密码不能为空',
                        }, {
                            min: 6,
                            message: '请输入正确格式的密码'
                        }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="您的密码"
                        />
                    )}
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


class CustomizedForm extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values.email);
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Layout>
                <Header className="header">
                    <HeaderLogin />
                </Header>
                <Layout>
                    <Content>
                        <MainLogin getFieldDecorator={getFieldDecorator} handleSubmit={this.handleSubmit} />
                    </Content>
                </Layout>
                <Footer>
                    < FooterAll />
                </Footer>
            </Layout>
        )
    }
}
const Login = Form.create({ name: 'normal_login' })(CustomizedForm);

export default Login;