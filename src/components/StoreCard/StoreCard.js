import React from "react";
import { Card, Pagination, Empty, Spin, Alert } from 'antd';
import ClassStore from '../../utils/dataStore'
import './index.css'

const { Meta } = Card;

function showTotal(total) {
    return `Total ${total} items`;
}

function PageData(props) {
    return (
        <div>
            <Spin spinning={props.loading}>
                <div className="store-Card-row">
                    {Object.keys(props.data).map(key => (
                        <div key={key} >
                            <Card
                                hoverable
                                style={{ width: 200, margin: 8 }}
                                cover={<img src={props.data[key].image} />}
                            >
                                <div className="store-Card">
                                    <Meta title={props.data[key].money} description={props.data[key].name} />
                                </div>
                            </Card>
                        </div>
                    )
                    )}
                </div>
                <div className="pagination">
                    <Pagination size="small" total={50} showSizeChanger showQuickJumper />
                </div>
            </Spin>
        </div>
    );
}


class StoreCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }
    componentDidUpdate() {
        this.state.loading = true;
    }
    //解决内存泄漏问题
    componentWillUnmount(){
        clearTimeout(this.loadTime);
    }
    render() {
        const dataAll = ClassStore[this.props.data.key].data[this.props.data.item].dataAll;
        this.loadTime = setTimeout(e => {
            this.state.loading = false
            this.forceUpdate();
        }, 1000)
        return dataAll.length ? <PageData data={dataAll} loading = {this.state.loading} />:<Empty description={false} />
    }
}
export default StoreCard;