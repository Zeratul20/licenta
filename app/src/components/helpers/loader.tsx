import spinner from "../../assets/gif/loader.gif";
import "./loader.css";

export const Loader: view = () => {
  return (
    <div className="spinner">
      <img src={spinner} style={{borderBlock: "none"}} />
      <p> Va rugam asteptati cateva momente... </p>
    </div>
  );
};
