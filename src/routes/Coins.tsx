import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { fetchCoins } from "./api";
import { isDarkAtom } from "./atom";

const SwitchTheme = styled.button`
  background: none;
  border: none;
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.bgColor};
  padding: 15px;
  border-radius: 15px;
`;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CoinList = styled.ul``;
const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    display: flex;
    align-items: center;
    padding: 20px;

    transition: color 0.2s ease-in-out;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.textColor};
    }
  }
`;

const Title = styled.h1`
  color: ${(props) => props.theme.textColor};
  font-size: 48px;
  margin-right: 15px;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 15px;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;
interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const recentTheme = useRecoilValue(isDarkAtom);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
  // const [coins, setCoins] = useState<CoinInterface[]>([]);
  // const [Loading, SetLoading] = useState(true);
  // //시작될 떄만 실행
  // useEffect(() => {
  //   (async () => {
  //     console.log(json);
  //     setCoins(json.slice(0, 100));
  //     SetLoading(false);
  //   })();
  // }, []);
  console.log(data);
  return (
    <Container>
      {/* <Helmet>
        <title>Coin</title>
      </Helmet> */}
      <Header>
        <Title>Coin</Title>
        <SwitchTheme onClick={toggleDarkAtom}>
          {recentTheme ? "Light" : "Dark"}
        </SwitchTheme>
      </Header>
      {isLoading ? (
        <Loader> Loading ... </Loader>
      ) : (
        <CoinList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: { name: coin.name },
                }}
              >
                <Img
                  src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
}

export default Coins;
