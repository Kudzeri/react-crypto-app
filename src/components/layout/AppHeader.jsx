import {Layout} from "antd";

const headerStyle = {
    textAlign: 'center',
    color: '#fff',
    height: 60,
    paddingInline: 48,
    lineHeight: '64px',
    backgroundColor: '#53aafd',
};

export const AppHeader = () => {
    return (
        <Layout.Header style={headerStyle}>
            Header
        </Layout.Header>
    )
}