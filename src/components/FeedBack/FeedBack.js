import React from 'react';
import { Link } from "react-router-dom";
import { Result, Button } from 'antd';
import './index.css'

class FeedBack extends React.Component {
    render() {
        return (
            <div className="card-404">
                <Result
                    status="404"
                    title="404"
                    subTitle="敬请期待"
                />
            </div>
        )
    }
}


export default FeedBack;