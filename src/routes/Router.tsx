import { BrowserRouter, Route, Switch } from "react-router-dom";
import Coin from "./Coin";
import Coins from "./Coins";

interface IRouterProps {}
function Router({}: IRouterProps) {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <Coins />
        </Route>
        <Route path="/:coinId">
          <Coin />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
