import { NavBar } from "./components/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./views/home";
import { General } from "./views/general";
import { Schedule } from "./views/schedule";
import { Catalog } from "./views/catalog";
import { Teme } from "./views/teme";
import { SignUp } from "./views/signUp";
import { Login } from "./views/login";
import * as producers from "./producers";

import { Loader } from "./components/helpers/loader";
import { Requests } from "./views/requests";

export const App: view = ({ isStateInitiated = observe.isStateInitiated }) => {
  if (!isStateInitiated) {
    return <Loader />;
  }
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/general"} element={<General />} />
          <Route path={"/orar"} element={<Schedule />} />
          <Route path={"/catalog"} element={<Catalog />} />
          <Route path={"/teme"} element={<Teme />} />
          <Route path={"/requests"} element={<Requests />} />
          <Route path={"/sign-up"} element={<SignUp />} />
          <Route path={"/login"} element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
};

App.producers(Object.values(producers));
