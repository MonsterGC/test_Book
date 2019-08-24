import React from 'react';
import {
    Form,
    Select,
    Button,
    Rate,
    Input,
    Icon,
    message
} from 'antd';
import './index.css'
const { Option } = Select;
class FeedBackTemp extends React.Component {
    state = { loading: false }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({
                    loading: true
                })
                localStorage.setItem('feedBack', JSON.stringify(values))
                setTimeout(() => {
                    this.setState({
                        loading: false
                    })
                    message.success('反馈成功')
                }, 1000);
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        return (
            <div className="card-404">
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item label="类型" hasFeedback>
                        {getFieldDecorator('select', {
                            rules: [{ required: true, message: 'Please select your country!' }],
                        })(
                            <Select placeholder="请选择反馈类型">
                                <Option value="用户举报">用户举报</Option>
                                <Option value="用户意见">用户意见</Option>
                                <Option value="发现漏洞">发现漏洞</Option>
                            </Select>,
                        )}
                    </Form.Item>


                    <Form.Item label="评分">
                        {getFieldDecorator('rate', {
                            initialValue: 3.5,
                        })(<Rate />)}
                    </Form.Item>
                    <Form.Item label="反馈">
                        {getFieldDecorator('bell', {
                            rules: [{ required: true, message: '备注不能为空' }],
                        })(
                            <Input
                                prefix={<Icon type="bell" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="备注"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                        <Button type="primary" loading={this.state.loading} htmlType="submit">
                            提交
          </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

const FeedBack = Form.create({ name: 'feed_back' })(FeedBackTemp);
export default FeedBack;