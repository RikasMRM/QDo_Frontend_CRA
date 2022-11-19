import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { ProtectedRoute } from "./auth/AuthRoute";
import NavBar from "./components/common/Navbar/NavBar";
import NotFound from "./components/common/NotFound/NotFount";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/UserAuth/Login";
import Register from "./pages/UserAuth/Register";
import AddTask from "./pages/Task/AddTask";

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
          <ProtectedRoute
            path={"/task/new"}
            exact
            component={AddTask}
          ></ProtectedRoute>
          <Route path={"/register"} exact component={Register}></Route>
          <Route path={"/login"} exact component={Login}></Route>

          <Route exact path="/session/404" component={NotFound} />

          <Route path="*" component={() => <Redirect to="/session/404" />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
