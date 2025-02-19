
import AppLayout from "./components/layout/AppLayout.jsx";
import { CryptoContextProvider } from "./context/CryptoContext.jsx";

function App() {

    return (
    <CryptoContextProvider>
        <AppLayout />
    </CryptoContextProvider>
  )
}

export default App
