import {Layout, Spin} from "antd";
import {AppHeader} from "../../components/layout/AppHeader.jsx";
import {AppSider} from "../../components/layout/AppSider.jsx";
import {AppContent} from "../../components/layout/AppContent.jsx";
import { useContext } from "react";
import CryptoContext from "../../context/CryptoContext.jsx";

const AppLayout = () => {
    const {loading}= useContext(CryptoContext)

    if (loading) {
        return <Spin fullscreen />;
    }
    
    return (
        <Layout>
            <AppHeader />
            <Layout>
                <AppSider />
                <AppContent />
            </Layout>
        </Layout>
    )
}

export default AppLayout