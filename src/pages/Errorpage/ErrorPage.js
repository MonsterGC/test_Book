import React from 'react';
import { Card } from 'antd';
import './index.css'

class ErrorPage extends React.Component {
    render() {
        return (
            <div className="card-404">
                <Card
                    hoverable
                    cover={<img alt="example" src="./src/images/404.jpg" />}
                >
                </Card>
            </div>
        )
    }
}


export default ErrorPage;