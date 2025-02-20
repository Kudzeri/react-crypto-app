import { useState, useRef } from "react";
import {
  Select,
  Space,
  Typography,
  Flex,
  Divider,
  Form,
  Button,
  InputNumber,
  DatePicker,
  Result,
} from "antd";
import { useCrypto } from "../context/CryptoContext";
import CoinInfo from "./layout/CoinInfo";

const AddAssetForm = ({ onClose }) => {
  const [form] = Form.useForm();
  const [coin, setCoin] = useState(null);
  const { crypto, addAsset } = useCrypto();
  const [submitted, setSubmitted] = useState(false);
  const assetRef = useRef(null);

  if (submitted) {
    return (
      <Result
        status="success"
        title="New Asset Added!"
        subTitle={`Added ${assetRef.current.amount} of ${
          coin.name
        } to your portfolio\nTotal: ${(
          assetRef.current.amount * coin.price
        ).toFixed(2)}$`}
        extra={[
          <Button type="primary" key="close" onClick={onClose}>
            Close
          </Button>,
        ]}
      />
    );
  }

  

  const handleAmountChange = (value) => {
    const price = form.getFieldValue("price");
    form.setFieldsValue({
      total: +(price * value).toFixed(2),
    });
  };

  const handlePriceChange = (value) => {
    const amount = form.getFieldValue("amount");
    form.setFieldsValue({
      total: +(amount * value).toFixed(2),
    });
  };

  const validateMessages = {
    required: "${label} is required!",
    types: {
      number: "${label} is not a valid number!",
      date: "${label} is not a valid date!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  if (!coin) {
    return (
      <Select
        style={{
          width: "100%",
        }}
        placeholder={"Select coin"}
        onSelect={(v) => setCoin(crypto.find((c) => c.id === v))}
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
    );
  }

  const onFinish = (values) => {
    const newAsset = {
      id: coin.id,
      amount: values.amount,
      price: values.price,
      date: values.date?.$d ?? new Date(),
    };

    assetRef.current = newAsset;
    setSubmitted(true);
    addAsset(newAsset)
  };

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 10,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        price: +coin.price.toFixed(2),
      }}
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <CoinInfo coin={coin} />
      <Divider />

      <Form.Item
        label="Amount"
        name="amount"
        rules={[
          {
            required: true,
            min: 0,
            type: "number",
          },
        ]}
      >
        <InputNumber
          placeholder="Enter coin amount"
          onChange={handleAmountChange}
          style={{ width: "100%" }}
          rules
        />
      </Form.Item>

      <Form.Item label="Price" name="price">
        <InputNumber onChange={handlePriceChange} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label="Date & Time" name="date">
        <DatePicker showTime style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label="Total" name="total">
        <InputNumber disabled style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Asset
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddAssetForm;
