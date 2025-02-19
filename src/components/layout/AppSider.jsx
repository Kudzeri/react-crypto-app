import {Card, Layout, List, Statistic, Tag, Typography} from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import {capitalize, percentDifference} from "../../utils.js";
import { useContext } from "react";
import CryptoContext from "../../context/CryptoContext.jsx";

const siderStyle = {
    padding: '1rem'
};

const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
];


export const AppSider = () => {
    const {assets}= useContext(CryptoContext)


    return (
        <Layout.Sider width='25%' style={siderStyle}>
            {assets.map((asset) => (
                <Card style={{marginBottom: '1rem'}} key={asset.id}>
                    <Statistic
                        title={capitalize(asset.id)}
                        value={asset.totalAmount}
                        precision={2}
                        valueStyle={{ color: asset.grow ? '#3f8600' : '#cf1322' }}
                        prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                        suffix="$"
                    />
                    <List
                        size='small'
                        dataSource={[
                            {title: 'Total Profit', value: asset.totalProfit, withTag: true},
                            {title: 'Asset amount', value: asset.amount, isPlain: true},
                        ]}
                        renderItem={(item) => (
                            <List.Item>
                                <span>{item.title}</span>

                                <span>
                                {item.withTag && (<Tag color={asset.grow ? 'green' : 'red'}>
                                    {asset.growPercent}%
                                </Tag>)}
                                {!item.isPlain && (
                                    <Typography.Text type={asset.grow ? 'success' : 'danger'}>
                                        {parseFloat(item.value).toFixed(2)}$
                                    </Typography.Text>
                                )}
                                {item.isPlain && item.value}
                                </span>
                            </List.Item>
                        )}
                    />
                </Card>
            ))}
        </Layout.Sider>
    )
}