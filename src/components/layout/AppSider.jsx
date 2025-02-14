import {Layout} from "antd";

const siderStyle = {
    textAlign: 'center',
    lineHeight: '120px',
    color: '#fff',
    background: '#0029c5',
};

export const AppSider = () => {
    return (
        <Layout.Sider width='25%' style={siderStyle}>
            Sider
        </Layout.Sider>
    )
}