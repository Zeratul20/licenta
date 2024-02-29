import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import SchoolImg from "../../assets/img/school.jpg";

export const Home: view = () => {
  return (
    <div className="object-fit-cover" style={{paddingLeft: "20px"}}>
      <h1 style={{textAlign: "center"}}>
        Colegiul de Informatică
      </h1>
      <p style={{textAlign: "center", paddingTop: "40px", fontSize: "20px"}}>
        <b>Bine ați venit pe pagina dedicată Colegiului de Informatică! </b>
      </p>
      <img src={SchoolImg} style={{width: "60%", height: "300px", marginLeft: "200px", marginTop: "25px", marginBottom: "50px"}}/>
    </div>
  )
}
