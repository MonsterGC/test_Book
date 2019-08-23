import React from 'react';
import {Link} from 'react-router-dom';
import { Result, Button } from 'antd';
import './index.css';



class SubmitOk extends React.Component {
    constructor(props) {
        super(props)
        let numTemp = []
        let num = (() => {
            for (let i = 0; i < 18; i++) {
                numTemp[i] = Math.floor(Math.random() * 10)
            }
            return "订单号:" + numTemp.join("");
        })()
        this.state = { number: num }
    }
    render() {
        return (
            <div className="tips">
                <Result
                    status="success"
                    title="订单提交成功"
                    subTitle={this.state.number}
                    extra={[
                        <Button type="primary" key="console">
                            <Link to="/">返回首页</Link>
                        </Button>
                    ]}
                />
            </div>
        );
    };
}

export default SubmitOk;