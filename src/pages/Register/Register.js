import React from 'react';
import { Form, Icon, Input, Button, Layout, message, Spin } from 'antd';
import FooterAll from '../../components/FooterAll/FooterAll';
// import API from '../../api';
import AdminNum from '../../utils/admin';
import './index.css';
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
                            message: '密码长度必须大于6'
                        }, {
                            pattern: /^[^\s]*$/,
                            message: '不能存在空字符'
                        }]
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="您的密码"
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    {props.getFieldDecorator('password2', {
                        rules: [{
                            required: true,
                            message: '密码不能为空',
                        }, {
                            min: 6,
                            message: '密码长度必须大于6'
                        }, {
                            pattern: /^[^\s]*$/,
                            message: '不能存在空字符'
                        }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="请再次输入你的密码"
                        />
                    )
                    }
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        注册
</Button>
                    Or <a href="/#/login">登录</a>
                </Form.Item>
            </Form>
        </div>
    );
}

class CustomizedForm extends React.Component {
    constructor(props) {
        super(props)
    }
    state = {
        loading: false,
        list: AdminNum
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({
                    loading: true
                })
                setTimeout(() => {
                    let temp = (
                        () => {
                            for (let i = 0; i < this.state.list.length; i++) {
                                if (values.email == this.state.list[i].email) return i;
                            }
                            return false;
                        }
                    )()
                    this.setState({
                        loading: false
                    })
                    if (typeof temp == "number") {
                        message.info('用户已注册')
                    } else {
                        if (values.password != values.password2) {
                            message.error('两次密码不一致');
                        } else {
                            localStorage.setItem('adminNumLoS', JSON.stringify({
                                email: values.email,
                                password: values.password
                            }))
                            this.props.history.push('/login');
                            message.success('注册成功')
                            // console.log(
                            //     API.Request('/Hello', { method: "post", data: { email }, header: { 'Access-Control-Allow-Headers': 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild' } })
                            //         .then(res => {
                            //             // console.log(res) 成功后跳转至login.js
                            //             if (res.status === 200 && res.data) {
                            //                 console.log(res.data);
                            //             }
                            //         })
                            //         .catch(err => {
                            //             console.log(err);
                            //         }));
                        }
                    }
                }, 1000);
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Spin spinning={this.state.loading}>
                <Layout>
                    <Header className="header">
                        <HeaderRegister />
                    </Header>
                    <Layout>
                        <Content>
                            <MainRegister getFieldDecorator={getFieldDecorator} handleSubmit={this.handleSubmit} />
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

const Register = Form.create({ name: 'normal_register' })(CustomizedForm);

export default Register;