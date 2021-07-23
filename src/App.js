import './App.scss';
import GoodsList from './components/goodsList/goodsLIst';
import GoodsInfo from './components/goodsInfo/goodsInfo';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  
  return (
    <Router>
        <Switch>
          <Route path="/info/:id">
            <GoodsInfo />
          </Route>
          <Route path="/">
            <GoodsList />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
