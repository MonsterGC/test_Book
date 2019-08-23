import React from 'react';
import {
    Descriptions,
    List,
    Avatar,
    Form,
    Icon,
    Input,
    Button,
    message,
    Spin
} from 'antd';
import './index.css'


class CardAllShow extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <Descriptions title="提交换书单" layout="vertical" bordered>

                </Descriptions>
                <List
                    itemLayout="horizontal"
                    dataSource={this.props.location.state}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src={item.image} />}
                                title={<a href={item.image}>{item.money}</a>}
                                description={item.msg}
                            />
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}

class AllCardTemp extends React.Component {
    constructor(props) {
        super(props)
    }
    state = { loading: false };
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({
                    loading: true
                })
                // 订单提交
                console.log(this.props.location.state,values);
                setTimeout(() => {
                    this.setState({
                        loading: false
                    })
                    message.success('提交订单成功')
                    this.props.history.push('/submitOk');
                }, 2000)
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Spin tip="订单提交中..." spinning={this.state.loading}>
                <div className="allcard-title">
                    <CardAllShow location={this.props.location} />
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [{
                                    required: true,
                                    message: '姓名不能为空',
                                }],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="姓名"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('phone', {
                                rules: [{
                                    required: true,
                                    message: '联系电话不能为空',
                                },],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="联系电话"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('environment', {
                                rules: [{
                                    required: true,
                                    message: '地址不能为空'
                                }],
                            })(
                                <Input
                                    prefix={<Icon type="environment" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="地址"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('bell', {
                                rules: [{ required: true, message: '备注不能为空' }],
                            })(
                                <Input
                                    prefix={<Icon type="bell" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="备注"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item >
                            <Button type="primary" htmlType="submit" className="login-form-button button-submit">
                                提交订单
                        </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Spin>
        )
    }
}

const AllCard = Form.create({ name: 'normal_submit' })(AllCardTemp);

export default AllCard;