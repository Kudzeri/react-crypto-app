import {Layout} from "antd";
import {AppHeader} from "./components/layout/AppHeader.jsx";
import {AppSider} from "./components/layout/AppSider.jsx";

function App() {

    return (
    <Layout>
        <AppHeader />
        <Layout>
            <AppSider />
        </Layout>
    </Layout>
  )
}

export default App
