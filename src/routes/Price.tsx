import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinTickers } from "./api";
interface CharProps {
  coinId: string;
}
interface info {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: number;
      ath_price: number;
      market_cap: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}
const Container = styled.div`
  width: 100%;
`;
const PriceInfo = styled.div`
  width: 100%;
  height: 50px;
  background-color: #f5f6fa;
  color: black;
  margin-bottom: 15px;
  border-radius: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
  font-weight: 600;
`;

function Price({ coinId }: CharProps) {
  const { isLoading, data } = useQuery<info>(["price", coinId], () =>
    fetchCoinTickers(coinId)
  );
  return (
    <Container>
      <PriceInfo>
        <span>Price:</span>
        <span>${data?.quotes.USD.price}</span>
      </PriceInfo>
      <PriceInfo>
        <span>Max Change rate in last 24h:</span>
        <span>{data?.quotes.USD.percent_change_24h}%</span>
      </PriceInfo>
      <PriceInfo>
        <span>Change rate ( last 30 Minute )</span>
        <span>{data?.quotes.USD.percent_change_30m}%</span>
      </PriceInfo>
      <PriceInfo>
        <span>Change rate ( last 1 Hours )</span>
        <span>{data?.quotes.USD.percent_change_1h}%</span>
      </PriceInfo>
      <PriceInfo>
        <span>Change rate ( last 6 Hours )</span>
        <span>{data?.quotes.USD.percent_change_6h}%</span>
      </PriceInfo>
      <PriceInfo>
        <span>Change rate ( last 12 Hours )</span>
        <span>{data?.quotes.USD.percent_change_12h}%</span>
      </PriceInfo>
      <PriceInfo>
        <span>Change rate ( last 24 Hours )</span>
        <span>{data?.quotes.USD.percent_change_24h}%</span>
      </PriceInfo>
    </Container>
  );
}

export default Price;
