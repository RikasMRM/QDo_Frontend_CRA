import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { ProtectedRoute } from "./auth/AuthRoute";
import Footer from "./components/common/Footer";
import NavBar from "./components/common/NavBar";
import NotFound from "./components/common/NotFount";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Switch>
          <ProtectedRoute
            path={"/"}
            exact
            component={Dashboard}
          ></ProtectedRoute>
          <Route path={"/register"} exact component={Register}></Route>
          <Route path={"/login"} exact component={Login}></Route>

          <Route exact path="/session/404" component={NotFound} />

          <Route path="*" component={() => <Redirect to="/session/404" />} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
