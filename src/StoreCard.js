import React from "react";
import { Card, Pagination, Empty, Spin, Alert } from 'antd';
import ClassStore from './Data/dataStore'

const { Meta } = Card;

function showTotal(total) {
    return `Total ${total} items`;
}


class StoreCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }
    componentDidUpdate() {
        this.state.loading  = true;
    }
    render() {
        let dataAll = ClassStore[this.props.data.key].data[this.props.data.item].dataAll;
        setTimeout(e => {
            this.state.loading = false
            this.forceUpdate();
        }, 1000)

        if (dataAll.length) {
            return (
                <div>
                    <Spin spinning={this.state.loading}>
                        <div className="store-Card-row">
                            {Object.keys(dataAll).map(key => (
                                <div key={key} >
                                    <Card
                                        hoverable
                                        style={{ width: 200, margin: 8 }}
                                        cover={<img src={dataAll[key].image} />}
                                    >
                                        <div className="store-Card">
                                            <Meta title={dataAll[key].money} description={dataAll[key].name} />
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
            )
        } else {
            return (
                <Empty description={false} />
            )
        }
    }
}
export default StoreCard;