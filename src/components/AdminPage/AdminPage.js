import React from 'react';
import './index.css';
import { List, Button, Skeleton } from 'antd';
import AdminNum from '../../utils/admin'


class AdminPage extends React.Component {
    state = {
        initLoading: true,
        loading: false,
        data: [],
        list: AdminNum,
    };

    componentDidMount() {
        this.setState({
            initLoading: false,
        });
    }

    render() {
        const { initLoading, loading, list } = this.state;
        const loadMore =
            !initLoading && !loading ? (
                <div
                    style={{
                        textAlign: 'center',
                        marginTop: 12,
                        height: 32,
                        lineHeight: '32px',
                    }}
                >
                </div>
            ) : null;

        return (
            <List
                className="demo-loadmore-list"
                loading={initLoading}
                itemLayout="horizontal"
                loadMore={loadMore}
                dataSource={list}
                renderItem={item => (
                    <List.Item
                        actions={[<Button type="primary">添加为管理员</Button>, <Button type="danger">删除</Button>,]}
                    >
                        <Skeleton avatar title={false} loading={item.loading} active>
                            <List.Item.Meta
                                title="1724264854@qq.com"
                                description="2019/08/24"
                            />
                        </Skeleton>
                    </List.Item>
                )}

            />
        );
    }
}

export default AdminPage;