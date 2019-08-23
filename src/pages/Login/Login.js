import React from 'react';
import { Form, Icon, Input, Button, Layout, message, Spin } from 'antd';
import FooterAll from '../../components/FooterAll/FooterAll';
import AdminNum from '../../utils/admin';
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
    constructor(props) {
        super(props)
    }
    state = {
        adminNum: AdminNum,
        loading: false
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let tempGet = JSON.parse(localStorage.getItem('adminNumLoS'));
                this.setState({
                    loading: true
                })
                let temp = (
                    () => {
                        if (tempGet) {
                            if (tempGet.email == values.email) {
                                return true
                            }
                        }
                        for (let i = 0; i < this.state.adminNum.length; i++) {
                            if (values.email == this.state.adminNum[i].email) return i;
                        }
                        return false;
                    }
                )()

                setTimeout(() => {
                    this.setState({
                        loading: false
                    })
                    if (temp) {
                        if (typeof temp == "number") {
                            if (values.password == this.state.adminNum[temp].password) {
                                localStorage.setItem('adminNumLoS', JSON.stringify({
                                    email: values.email,
                                    password: values.password
                                }))
                                message.success('登录成功')
                                this.props.history.push('/');
                            } else {
                                message.error('密码错误')
                            }
                        } else {
                            if (values.password == tempGet.password) {
                                message.success('登录成功')
                                this.props.history.push('/');
                            } else {
                                message.error('密码错误')
                            }
                        }
                    } else {
                        console.log(temp, '123');
                        message.error('用户不存在请跳转注册页面')
                    }
                }, 1000)
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Spin spinning={this.state.loading}>
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
            </Spin>
        )
    }
}
const Login = Form.create({ name: 'normal_login' })(CustomizedForm);

export default Login;