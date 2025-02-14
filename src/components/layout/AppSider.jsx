import {Card, Layout, List, Spin, Statistic, Tag, Typography} from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import {useEffect, useState} from "react";
import {fakeFetchCrypto, fetchAssets} from "../../api.js";
import {capitalize, percentDifference} from "../../utils.js";

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
    const [loading, setLoading] = useState(false);

    const [crypto, setCrypto] = useState([]);
    const [assets, setAssets] = useState([]);

    useEffect(() => {
        async function preload() {
            setLoading(true);
            const {result} = await  fakeFetchCrypto()
            const assets = await fetchAssets()

            setAssets(assets.map(asset => {
                const coin = result.find(c => c.id === asset.id)
                return {
                    grow: asset.price < coin.price,
                    growPercent: percentDifference(asset.price, coin.price),
                    totalAmount: asset.amount * coin.price,
                    totalProfit: asset.amount * coin.price - asset.amount * asset.price,
                    ...asset
                }
            }))
            setCrypto(result)
            setLoading(false);
        }

        preload()
    }, []);

    if (loading) {
        return <Spin fullscreen />;
    }
    

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