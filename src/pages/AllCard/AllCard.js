import React from 'react';
import {
    Descriptions,
    List,
    Avatar,
    Form,
    Icon,
    Input,
    Button,
    Checkbox
} from 'antd';
import './index.css'


class AllCardTemp extends React.Component {
    constructor(props) {
        super(props)
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="allcard-title">
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

                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="姓名"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="联系电话"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('environment', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input
                                prefix={<Icon type="environment" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="地址"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('bell', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
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
        )
    }
}

const AllCard = Form.create({ name: 'normal_submit' })(AllCardTemp);

export default AllCard;