import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import SchoolImg from "../../assets/img/school.jpg";
import AboutImg from "../../assets/img/about.jpg";
import FeatureImg from "../../assets/img/feature.jpg";
import Graduate_Girl from "../../assets/img/graduate_girl.jpg";
import Graduate_Boy from "../../assets/img/graduate_boy.png";
import Quote from "../../assets/img/quote.png";

export const Home: view = () => {
  return (
    <>
      {/* //{" "}
      <div className="object-fit-cover" style={{ paddingLeft: "20px" }}>
        //{" "}
        <h1 style={{ textAlign: "center" }}>// Colegiul de Informatică // </h1>
        //{" "}
        <p
          style={{ textAlign: "center", paddingTop: "40px", fontSize: "20px" }}
        >
          //{" "}
          <b>Bine ați venit pe pagina dedicată Colegiului de Informatică! </b>
          //{" "}
        </p>
        //{" "}
        <img
          src={SchoolImg}
          style={{
            width: "60%",
            height: "300px",
            marginLeft: "200px",
            marginTop: "25px",
            marginBottom: "50px",
          }}
        />
        //{" "}
      </div> */}
      <h1 style={{textAlign: "center"}}>
        Colegiul de Informatică
      </h1>
      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="row">
            <div
              className="col-lg-5 mb-5 mb-lg-0"
              style={{ minHeight: "500px" }}
            >
              <div className="position-relative h-100">
                <img
                  src={AboutImg}
                  alt="website template image"
                  className="position-absolute w-100 h-100"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
            <div className="col-lg-7">
              <div className="section-title position-relative mb-4">
                <h6 className="d-inline-block position-relative text-secondary text-uppercase pb-2">
                  Despre noi
                </h6>
                <h1 className="display-4">
                  Cea mai bună alegere pentru educația elevilor
                </h1>
              </div>
              <p>
                Cu o istorie de peste 100 de ani, Colegiul de Informatică este o
                instituție de învățământ preuniversitar de prestigiu, care
                oferă o educație de calitate, bazată pe valori și principii
                solide. Înființat în anul 1919, colegiul nostru a devenit un
                reper în domeniul educației, fiind recunoscut pentru rezultatele
                excepționale obținute de elevii săi la concursurile naționale și
                internaționale. În cadrul instituției noastre, elevii beneficiază
                de un mediu de învățare stimulant, care îi ajută să-și dezvolte
                abilitățile și competențele, să-și descopere pasiunile și să-și
                atingă obiectivele academice și profesionale.
              </p>
              <div className="row pt-3 mx-0">
                <div className="col-3 px-0">
                  <div className="bg-success text-center p-4">
                    <h1 className="text-white" data-toggle="counter-up">
                      50
                    </h1>
                    <h6 className="text-uppercase text-white">
                      Profesori <span className="d-block">Dedicați</span>
                    </h6>
                  </div>
                </div>
                <div className="col-3 px-0">
                  <div className="bg-primary text-center p-4">
                    <h1 className="text-white" data-toggle="counter-up">
                      15
                    </h1>
                    <h6 className="text-uppercase text-white">
                      Materii<span className="d-block">Facultative</span>
                    </h6>
                  </div>
                </div>
                <div className="col-3 px-0">
                  <div className="bg-secondary text-center p-4">
                    <h1 className="text-white" data-toggle="counter-up">
                      30
                    </h1>
                    <h6 className="text-uppercase text-white">
                      Olimpici<span className="d-block">Naționali</span>
                    </h6>
                  </div>
                </div>
                <div className="col-3 px-0">
                  <div className="bg-warning text-center p-4">
                    <h1 className="text-white" data-toggle="counter-up">
                      10
                    </h1>
                    <h6 className="text-uppercase text-white">
                      Concursuri<span className="d-block">Organizate/an</span>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid bg-image" style={{ margin: "90px 0" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-7 my-5 pt-5 pb-lg-5">
              <div className="section-title position-relative mb-4">
                <h6 className="d-inline-block position-relative text-secondary text-uppercase pb-2">
                  De ce să alegi colegiul nostru?
                </h6>
                <h1 className="display-4">
                  De ce ar trebui să înveți la noi?
                </h1>
              </div>
              <p className="mb-4 pb-2">
                În afară de rezultatele excepționale obținute de elevii noștri la
                concursurile naționale și internaționale, colegiul nostru se remarcă
                și prin calitatea educației oferite, prin mediul de învățare stimulant 
                și prin resursele moderne de care dispune. 
                Elevii noștri beneficiază de un program educațional diversificat, 
                care îi ajută să-și dezvolte abilitățile și competențele, 
                să-și descopere pasiunile și să-și atingă obiectivele academice 
                și profesionale. În plus, colegiul nostru oferă oportunități 
                de dezvoltare personală și profesională, 
                care îi ajută pe elevi să-și valorifice potențialul și să-și 
                construiască un viitor de succes.
              </p>
              <div className="d-flex mb-3">
                <div className="btn-icon bg-primary mr-4">
                  <i className="fa fa-2x fa-graduation-cap text-white"></i>
                </div>
                <div className="mt-n1">
                  <h4>Profesori cu experiență</h4>
                  <p>
                    Profesorii noștri sunt specialiști în domeniile lor de activitate,
                    cu o vastă experiență în predare și cu rezultate remarcabile
                    la concursurile naționale și internaționale. În plus, sunt foarte dedicați
                    domeniului în care activează, fiind mereu la curent cu ultimele noutăți
                    și tendințe.
                  </p>
                </div>
              </div>
              <div className="d-flex mb-3">
                <div className="btn-icon bg-secondary mr-4">
                  <i className="fa fa-2x fa-certificate text-white"></i>
                </div>
                <div className="mt-n1">
                  <h4>Certificat Internațional</h4>
                  <p>
                    Elevii noștri au oportunitatea de a obține un certificat internațional
                    recunoscut la nivel mondial, care le deschide ușile către cele mai bune
                    universități din lume. Certificatul este un atu important în procesul de
                    admitere la facultate și în cariera profesională.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-5" style={{ minHeight: "500px" }}>
              <div className="position-relative h-95">
                <img
                  src={FeatureImg}
                  alt="website template image"
                  className="position-absolute w-100 h-95"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="section-title text-center position-relative mb-5">
            <h6 className="d-inline-block position-relative text-secondary text-uppercase pb-2">
              Instructors
            </h6>
            <h1 className="display-4">Meet Our Instructors</h1>
          </div>
          <div
            className="owl-carousel team-carousel position-relative owl-loaded owl-drag"
            style="padding:0 30px;"
          >
            <div className="owl-stage-outer">
              <div
                className="owl-stage"
                style="transform: translate3d(-900px, 0px, 0px); transition: all 1s ease 0s; width: 3000px;"
              >
                <div
                  className="owl-item cloned"
                  style="width: 270px; margin-right: 30px;"
                >
                  <div className="team-item">
                    <img
                      className="img-fluid w-100"
                      src="assets/img/team-2.jpg"
                      alt="website template image"
                    />
                    <div className="bg-light text-center p-4">
                      <h5 className="mb-3">Instructor Name</h5>
                      <p className="mb-2">Web Design &amp; Development</p>
                    </div>
                  </div>
                </div>
                <div
                  className="owl-item cloned"
                  style="width: 270px; margin-right: 30px;"
                >
                  <div className="team-item">
                    <img
                      className="img-fluid w-100"
                      src="assets/img/team-3.jpg"
                      alt="website template image"
                    />
                    <div className="bg-light text-center p-4">
                      <h5 className="mb-3">Instructor Name</h5>
                      <p className="mb-2">Web Design &amp; Development</p>
                    </div>
                  </div>
                </div>
                <div
                  className="owl-item cloned"
                  style="width: 270px; margin-right: 30px;"
                >
                  <div className="team-item">
                    <img
                      className="img-fluid w-100"
                      src="assets/img/team-4.jpg"
                      alt="website template image"
                    />
                    <div className="bg-light text-center p-4">
                      <h5 className="mb-3">Instructor Name</h5>
                      <p className="mb-2">Web Design &amp; Development</p>
                    </div>
                  </div>
                </div>
                <div
                  className="owl-item active"
                  style="width: 270px; margin-right: 30px;"
                >
                  <div className="team-item">
                    <img
                      className="img-fluid w-100"
                      src="assets/img/team-1.jpg"
                      alt="website template image"
                    />
                    <div className="bg-light text-center p-4">
                      <h5 className="mb-3">Instructor Name</h5>
                      <p className="mb-2">Web Design &amp; Development</p>
                    </div>
                  </div>
                </div>
                <div
                  className="owl-item active"
                  style="width: 270px; margin-right: 30px;"
                >
                  <div className="team-item">
                    <img
                      className="img-fluid w-100"
                      src="assets/img/team-2.jpg"
                      alt="website template image"
                    />
                    <div className="bg-light text-center p-4">
                      <h5 className="mb-3">Instructor Name</h5>
                      <p className="mb-2">Web Design &amp; Development</p>
                    </div>
                  </div>
                </div>
                <div
                  className="owl-item active"
                  style="width: 270px; margin-right: 30px;"
                >
                  <div className="team-item">
                    <img
                      className="img-fluid w-100"
                      src="assets/img/team-3.jpg"
                      alt="website template image"
                    />
                    <div className="bg-light text-center p-4">
                      <h5 className="mb-3">Instructor Name</h5>
                      <p className="mb-2">Web Design &amp; Development</p>
                    </div>
                  </div>
                </div>
                <div
                  className="owl-item"
                  style="width: 270px; margin-right: 30px;"
                >
                  <div className="team-item">
                    <img
                      className="img-fluid w-100"
                      src="assets/img/team-4.jpg"
                      alt="website template image"
                    />
                    <div className="bg-light text-center p-4">
                      <h5 className="mb-3">Instructor Name</h5>
                      <p className="mb-2">Web Design &amp; Development</p>
                    </div>
                  </div>
                </div>
                <div
                  className="owl-item cloned"
                  style="width: 270px; margin-right: 30px;"
                >
                  <div className="team-item">
                    <img
                      className="img-fluid w-100"
                      src="assets/img/team-1.jpg"
                      alt="website template image"
                    />
                    <div className="bg-light text-center p-4">
                      <h5 className="mb-3">Instructor Name</h5>
                      <p className="mb-2">Web Design &amp; Development</p>
                    </div>
                  </div>
                </div>
                <div
                  className="owl-item cloned"
                  style="width: 270px; margin-right: 30px;"
                >
                  <div className="team-item">
                    <img
                      className="img-fluid w-100"
                      src="assets/img/team-2.jpg"
                      alt="website template image"
                    />
                    <div className="bg-light text-center p-4">
                      <h5 className="mb-3">Instructor Name</h5>
                      <p className="mb-2">Web Design &amp; Development</p>
                    </div>
                  </div>
                </div>
                <div
                  className="owl-item cloned"
                  style="width: 270px; margin-right: 30px;"
                >
                  <div className="team-item">
                    <img
                      className="img-fluid w-100"
                      src="assets/img/team-3.jpg"
                      alt="website template image"
                    />
                    <div className="bg-light text-center p-4">
                      <h5 className="mb-3">Instructor Name</h5>
                      <p className="mb-2">Web Design &amp; Development</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="owl-nav">
              <div className="owl-prev">
                <i className="fa fa-angle-left" aria-hidden="true"></i>
              </div>
              <div className="owl-next">
                <i className="fa fa-angle-right" aria-hidden="true"></i>
              </div>
            </div>
            <div className="owl-dots disabled"></div>
          </div>
        </div>
      </div> */}
      <div
        className="container-fluid bg-image py-5"
        style={{ margin: "90px 0" }}
      >
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-5 mb-5 mb-lg-0">
              <div className="section-title position-relative mb-4">
                <h6 className="d-inline-block position-relative text-secondary text-uppercase pb-2">
                  Testimonial
                </h6>
                <h1 className="display-4">Ce spun elevii noștri?</h1>
              </div>
              <p className="m-0">
                Elevii noștri sunt foarte mulțumiți de educația pe care o primesc
                la colegiul nostru, fapt ce se reflectă atât în rezultatele excepționale
                pe care le obțin la concursurile naționale și internaționale, cât și 
                în feedback-ul pozitiv pe care îl primim din partea lor. Iată ce spune
                o fostă elevă a colegiului nostru:
              </p>
            </div>
            <div className="col-lg-7">
              <div className="" style={{ border: "1px solid #888" }}>
                <div className="p-5" style={{display: "flex", backgroundColor: "#dddddd"}}>
                  <div>
                    <img
                      src={Quote}
                      style={{
                        width: "30px",
                        height: "30px",
                        marginBottom: "10px",
                      }}
                    />
                    <div className="d-flex flex-shrink-0 align-items-center mt-4">
                      <img
                        className="img-fluid mr-4"
                        style={{ width: "1500px", height: "200px" }}
                        src={Graduate_Girl}
                        alt="website template image"
                      />
                    </div>
                  </div>
                  <p style={{paddingLeft: "30px", paddingTop: "50px"}}>
                    Am absolvit Colegiul de Informatică și pot spune că a fost
                    cea mai bună alegere pe care am făcut-o. Profesorii sunt
                    foarte bine pregătiți, iar mediul de învățare este stimulant.
                    Am avut ocazia să particip la numeroase concursuri naționale
                    și internaționale, unde am obținut rezultate remarcabile.
                    Recomand cu căldură colegiul nostru tuturor elevilor pasionați
                    de informatică și tehnologie!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
