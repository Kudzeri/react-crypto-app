import { Layout, Select, Space, Button, Modal, Drawer } from "antd";
import { useCrypto } from "../../context/CryptoContext";
import { useEffect, useState } from "react";
import CoinInfoModal from "../CoinInfoModal";
import AddAssetForm from "../AddAssetForm";

const headerStyle = {
  width: `100%`,
  textAlign: "center",
  height: 60,
  padding: "1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

export const AppHeader = () => {
  const [select, setSelect] = useState(false);
  const [coin, setCoin] = useState(null);
  const [modal, setModal] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const { crypto } = useCrypto();
  const handleSelect = (value) => {
    setModal(true);
    setCoin(crypto.find((c) => c.id === value));
  };

  useEffect(() => {
    const keypress = (e) => {
      if (e.key === "/") {
        setSelect((prev) => !prev);
      }
    };
    document.addEventListener("keypress", keypress);
    return () => {
      document.removeEventListener("keypress", keypress);
    };
  }, []);

  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{
          width: 250,
        }}
        open={select}
        value={"press / to open"}
        onSelect={handleSelect}
        onClick={() => setSelect((prev) => !prev)}
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img
              style={{ width: 20 }}
              src={option.data.icon}
              alt={option.data.label}
            />{" "}
            {option.data.label}
          </Space>
        )}
      />

      <Button type="primary" onClick={() => setDrawer((prev) => !prev)}>Add asset</Button>

      <Modal
        open={modal}
        onCancel={() => {
          setModal(false);
        }}
        footer={null}
      >
        <CoinInfoModal coin={coin} />
      </Modal>

      <Drawer width={600} title="Add a new asset" onClose={() => setDrawer(false)} open={drawer} >
        <AddAssetForm />
        </Drawer>
    </Layout.Header>
  );
};
