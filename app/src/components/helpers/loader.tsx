import spinner from "../../assets/gif/loader.gif";
import "./loader.css";

export const Loader: view = () => {
  return (
    <div className="spinner" style={{backgroundColor: "transparent"}}>
      <img src={spinner} style={{borderBlock: "none", background: "transparent"}} />
      <p> Va rugam asteptati cateva momente... </p>
    </div>
  );
};
