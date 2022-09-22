import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import ActivityCreate from "./components/ActivityCreate";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home" component={Home} />
          <Route path="/activities" component={ActivityCreate} />
        </Switch>
        <h1>Henry Countries</h1>
      </div>
    </BrowserRouter>
  );
}

export default App;
