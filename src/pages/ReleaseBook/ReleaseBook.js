import React from 'react';
import {
    Form,
    Select,
    InputNumber,
    Button,
    Upload,
    Icon,
    Input,
    Descriptions,
    Spin,
    message
} from 'antd';
import './index.css';


const { Option } = Select;
class ReleaseBookTemp extends React.Component {
    constructor(props) {
        super(props)
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({
                    loading: true
                })
                console.log(values);
                localStorage.setItem('releaseBook',JSON.stringify({values}))
                setTimeout(() => {
                    this.setState({
                        loading: false
                    })
                    this.props.history.push('/');
                    message.success('已发布后台审核')
                }, 1000);
            }
        });
    };
    normFile = e => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    state = { loading: false };
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        return (
            <Spin tip="发布中..." spinning={this.state.loading}>
                <div className="releaseBook_wid">
                    <Descriptions title="发布闲置" style={{ marginBottom: 50 }} layout="vertical" bordered>

                    </Descriptions>
                    <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                        <Form.Item label="类型" hasFeedback>
                            {getFieldDecorator('select', {
                                rules: [{ required: true, message: '请选择你的类型' }],
                            })(
                                <Select placeholder="请选择闲置书类型">
                                    <Option value="文学">小说</Option>
                                    <Option value="艺术">艺术</Option>
                                    <Option value="体育运动">体育运动</Option>
                                    <Option value="工业技术">工业技术</Option>
                                    <Option value="历史">历史</Option>
                                    <Option value="经管">经管</Option>
                                    <Option value="计算机与互联网">计算机与互联网</Option>
                                    <Option value="科学与自然">科学与自然</Option>
                                </Select>,
                            )}
                        </Form.Item>

                        <Form.Item label="原价格">
                            {getFieldDecorator('input-number', { initialValue: 3 })(<InputNumber min={1} />)}
                            <span className="ant-form-text"> /元</span>
                        </Form.Item>
                        <Form.Item label="备注">
                            {getFieldDecorator('bell', {
                                rules: [{ required: true, message: '备注不能为空' }],
                            })(
                                <Input
                                    prefix={<Icon type="bell" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="备注"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item label="图片">
                            <div className="dropbox">
                                {getFieldDecorator('dragger', {
                                    valuePropName: 'fileList',
                                    getValueFromEvent: this.normFile,
                                    rules: [{ required: true, message: '必须上传图片' }],
                                })(
                                    <Upload.Dragger name="files" action="/#">
                                        <p className="ant-upload-drag-icon">
                                            <Icon type="inbox" />
                                        </p>
                                        <p className="ant-upload-text">上传图片</p>
                                        <p className="ant-upload-hint">jpg|png|jpeg格式</p>
                                    </Upload.Dragger>,
                                )}
                            </div>
                        </Form.Item>

                        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                            <Button type="primary" htmlType="submit">
                                发布
</Button>
                        </Form.Item>
                    </Form>
                </div>
            </Spin>
        );
    }
}

const ReleaseBook = Form.create({ name: 'release_book' })(ReleaseBookTemp);

export default ReleaseBook;