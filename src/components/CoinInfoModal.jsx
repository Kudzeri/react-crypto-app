import { Divider, Flex, Tag, Typography } from "antd";
import CoinInfo from "./layout/CoinInfo";
import React from "react";

const CoinInfoModal = ({ coin }) => {
  return (
    <>
      <CoinInfo coin={coin} withSymbol/>

      <Divider />
      
      <Typography.Paragraph>
        <Typography.Text strong style={{ paddingRight: 4 }}>
          1 hour:
        </Typography.Text>
        <Tag color={coin.priceChange1h > 0 ? "green" : "red"}>
          {coin.priceChange1h}%
        </Tag>

        <Typography.Text strong style={{ paddingRight: 4 }}>
          1 day:
        </Typography.Text>
        <Tag color={coin.priceChange1d > 0 ? "green" : "red"}>
          {coin.priceChange1h}%
        </Tag>

        <Typography.Text strong style={{ paddingRight: 4 }}>
          1 week:
        </Typography.Text>
        <Tag color={coin.priceChange1w > 0 ? "green" : "red"}>
          {coin.priceChange1h}%
        </Tag>
      </Typography.Paragraph>

      <Typography.Paragraph>
        <Typography.Text strong style={{ paddingRight: 4 }}>
          Price:
        </Typography.Text>
        {coin.price.toFixed(2)}$
      </Typography.Paragraph>

      <Typography.Paragraph>
        <Typography.Text strong style={{ paddingRight: 4 }}>
          Price BTC:
        </Typography.Text>
        {coin.priceBtc}
      </Typography.Paragraph>

      <Typography.Paragraph>
        <Typography.Text strong style={{ paddingRight: 4 }}>
          Market Cap:
        </Typography.Text>
        {coin.marketCap}$
      </Typography.Paragraph>

      {coin.contractAddress && (
        <Typography.Paragraph>
          <Typography.Text strong style={{ paddingRight: 4 }}>
            Contract Address:
          </Typography.Text>
          {coin.contractAddress}
        </Typography.Paragraph>
      )}
    </>
  );
};

export default CoinInfoModal;
