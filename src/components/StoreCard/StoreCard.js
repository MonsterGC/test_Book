import React from "react";
import { Card, Pagination, Empty, Spin, Modal, Button, message, Drawer } from 'antd';
import ClassStore from '../../utils/dataStore'
import { Link } from 'react-router-dom';
import './index.css'

const { Meta } = Card;

function showTotal(total) {
    return `Total ${total} items`;
}

class CardComponent extends React.Component {
    constructor(props) {
        super(props)
    }
    //解决内存泄漏问题
    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return;
        };
    }
    render() {
        return this.props.Card.length ? (
            <div>
                {Object.keys(this.props.Card).map((key) => (
                    <div key={key} >
                        <Card style={{ width: 540 }}>
                            <div className="model-row">
                                <div>
                                    <img className="model-img" src={this.props.Card[key].image}></img>
                                </div>
                                <div className="model-column">
                                    <div className="text-01">{this.props.Card[key].money}</div>
                                    <div className="text-02">{this.props.Card[key].msg}</div>
                                </div>
                                <div className="delete" onClick={(x) => this.props.delete(this.props.Card[key].image)}>
                                    <Button type="danger">删除</Button>
                                </div>
                            </div>
                        </Card>
                    </div>
                )
                )}
                <div className="model-right">
                    <Button type="primary" >
                        <Link to={{
                            pathname: '/allCard',
                            state: this.props.Card
                        }}>全部都换</Link></Button>
                </div>
            </div>
        ) : (<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />)
    }
}

class PageData extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        visible: false,
        visible2: false,
        image: '',
        msg: '',
        money: '',
        Card: []
    };

    showModal = (x, y, z) => {
        this.setState({
            visible: true,
            image: x,
            money: y,
            msg: z
        });
        console.log(x, y, z);
    };
    //解决内存泄漏问题
    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return;
        };
    }
    handleOk = e => {
        let CardTemp = this.state.Card
        if ((() => {
            for (let i = 0; i < this.state.Card.length; i++) {
                if (this.state.image == this.state.Card[i].image) return true
            }
        })()) {
            message.error('已加入箱中...');
        } else {
            CardTemp.push({
                image: this.state.image,
                msg: this.state.msg,
                money: this.state.money
            })
            message.success('加入成功');
        }
        this.setState({
            visible: false,
            Card: CardTemp
        });
        // ------------------------------------------------------
        // this.props.badge(this.state.Card.length)     子向父组件传值失败！！！
        // --------------------------------------------------
    };

    handleCancel = e => {
        message.warning('用户取消');
        this.setState({
            visible: false,
        });
    };

    onClose = () => {
        localStorage.setItem('load', false)
        console.log('取消成功');
    }

    delete = (image) => {
        let item = (() => {
            for (let i = 0; i < this.state.Card.length; i++) {
                if (image == this.state.Card[i].image) return i
            }
            return -1;
        })()
        if (item > -1) {
            this.state.Card.splice(item, 1);
            message.success('删除成功')
        } else {
            message.error('不存在')
        }
    }
    render() {
        return (
            <div>
                <Spin spinning={this.props.loading}>
                    <div className="store-Card-row">
                        {Object.keys(this.props.data).map(key => (
                            <div key={key} >
                                <Card
                                    hoverable
                                    style={{ width: 200, margin: 8 }}
                                    cover={<img src={this.props.data[key].image} />}
                                    onClick={(x, y, z) => this.showModal(this.props.data[key].image, this.props.data[key].money, this.props.data[key].name)}
                                >
                                    <div className="store-Card">
                                        <Meta title={this.props.data[key].money} description={this.props.data[key].name} />
                                    </div>
                                </Card>
                            </div>
                        )
                        )}
                    </div>
                    <Modal
                        title="加入换书箱"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        footer={[
                            <Button key="submit" type="primary" onClick={this.handleOk}>
                                加入
                            </Button>
                        ]}
                    >
                        <div className="model-row">
                            <div>
                                <img className="model-img" src={this.state.image}></img>
                            </div>
                            <div className="model-column">
                                <div className="text-01">{this.state.money}</div>
                                <div className="text-02">{this.state.msg}</div>
                            </div>
                        </div>
                    </Modal>

                    <Drawer
                        title="换书箱"
                        width="600"
                        placement="right"
                        closable={false}
                        onClose={this.props.onClose}
                        visible={this.props.cardload}
                    >
                        <div className="model-column">
                            <CardComponent delete={this.delete} Card={this.state.Card} />
                        </div>
                    </Drawer>
                    <div className="pagination">
                        <Pagination size="small" total={50} showSizeChanger showQuickJumper />
                    </div>
                </Spin>
            </div>
        );
    }
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
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
        clearTimeout(this.loadTime);
    }

    render() {
        const dataAll = ClassStore[this.props.data.key].data[this.props.data.item].dataAll;
        this.loadTime = setTimeout(e => {
            this.state.loading = false
            this.forceUpdate();
        }, 1000)
        return dataAll.length ? <PageData badge={this.props.badge} data={dataAll} onClose={this.props.onClose} loading={this.state.loading} cardload={this.props.cardload} /> : <Empty description={false} />
    }
}
export default StoreCard;