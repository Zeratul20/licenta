import { NavBar } from "./components/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./views/home";
import { General } from "./views/general";
import { Orar } from "./views/orar";
import { Catalog } from "./views/catalog";
import { Teme } from "./views/teme";

export const App = () => {
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/general"} element={<General />} />
          <Route path={"/orar"} element={<Orar />} />
          <Route path={"/catalog"} element={<Catalog />} />
          <Route path={"/teme"} element={<Teme />} />
        </Routes>
      </Router>
    </div>
  );
};
