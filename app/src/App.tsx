import { NavBar } from "./components/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./views/home";
import { General } from "./views/general";
import { Schedule } from "./views/schedule";
import { Catalogue } from "./views/catalogue";
import { Teme } from "./views/teme";
import { SignUp } from "./views/signUp";
import { Login } from "./views/login";
import * as producers from "./producers";
import { ToastContainer } from "react-toastify";

import { Loader } from "./components/helpers/loader";
import { Requests } from "./views/requests";
import { Classes } from "./views/classes";
import { ClassDetails } from "./views/classes/classDetails";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";
import { Reports } from "./views/reports";
import { NotFound } from "./components/helpers/notFound";

export const App: view = ({ isStateInitiated = observe.isStateInitiated }) => {
  if (!isStateInitiated) {
    return <Loader />;
  }
  return (
    <div className="cover">
      <Router>
        <NavBar />
        <div className="card-container">
          <div className="card-content">
            <Routes>
              <Route path={"/"} element={<Home />} />
              <Route path={"/general"} element={<General />} />
              <Route path={"/orar"} element={<Schedule />} />
              <Route path={"/catalog"} element={<Catalogue />} />
              {/* <Route path={"/teme"} element={<Teme />} /> */}
              <Route path={"/requests"} element={<Requests />} />
              <Route path={"/classes"} element={<Classes />} />
              <Route path={"/classes/:classId"} element={<ClassDetails />} />
              <Route path={"/reports"} element={<Reports />} />
              <Route path={"/sign-up"} element={<SignUp />} />
              <Route path={"/login"} element={<Login />} />
              <Route path={"*"} element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </Router>
      <ToastContainer />
    </div>
  );
};

App.producers(Object.values(producers));
