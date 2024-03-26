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
                  About Us
                </h6>
                <h1 className="display-4">
                  First Choice For Online Education Anywhere
                </h1>
              </div>
              <p>
                Tempor erat elitr at rebum at at clita aliquyam consetetur. Diam
                dolor diam ipsum et, tempor voluptua sit consetetur sit.
                Aliquyam diam amet diam et eos sadipscing labore. Clita erat
                ipsum et lorem et sit, sed stet no labore lorem sit. Sanctus
                clita duo justo et tempor consetetur takimata eirmod, dolores
                takimata consetetur invidunt magna dolores aliquyam dolores
                dolore. Amet erat amet et magna
              </p>
              <div className="row pt-3 mx-0">
                <div className="col-3 px-0">
                  <div className="bg-success text-center p-4">
                    <h1 className="text-white" data-toggle="counter-up">
                      123
                    </h1>
                    <h6 className="text-uppercase text-white">
                      Available<span className="d-block">Subjects</span>
                    </h6>
                  </div>
                </div>
                <div className="col-3 px-0">
                  <div className="bg-primary text-center p-4">
                    <h1 className="text-white" data-toggle="counter-up">
                      1234
                    </h1>
                    <h6 className="text-uppercase text-white">
                      Online<span className="d-block">Courses</span>
                    </h6>
                  </div>
                </div>
                <div className="col-3 px-0">
                  <div className="bg-secondary text-center p-4">
                    <h1 className="text-white" data-toggle="counter-up">
                      123
                    </h1>
                    <h6 className="text-uppercase text-white">
                      Skilled<span className="d-block">Instructors</span>
                    </h6>
                  </div>
                </div>
                <div className="col-3 px-0">
                  <div className="bg-warning text-center p-4">
                    <h1 className="text-white" data-toggle="counter-up">
                      1234
                    </h1>
                    <h6 className="text-uppercase text-white">
                      Happy<span className="d-block">Students</span>
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
                  Why Choose Us?
                </h6>
                <h1 className="display-4">
                  Why You Should Start Learning with Us?
                </h1>
              </div>
              <p className="mb-4 pb-2">
                Aliquyam accusam clita nonumy ipsum sit sea clita ipsum clita,
                ipsum dolores amet voluptua duo dolores et sit ipsum rebum,
                sadipscing et erat eirmod diam kasd labore clita est. Diam
                sanctus gubergren sit rebum clita amet.
              </p>
              <div className="d-flex mb-3">
                <div className="btn-icon bg-primary mr-4">
                  <i className="fa fa-2x fa-graduation-cap text-white"></i>
                </div>
                <div className="mt-n1">
                  <h4>Skilled Instructors</h4>
                  <p>
                    Labore rebum duo est Sit dolore eos sit tempor eos stet,
                    vero vero clita magna kasd no nonumy et eos dolor magna
                    ipsum.
                  </p>
                </div>
              </div>
              <div className="d-flex mb-3">
                <div className="btn-icon bg-secondary mr-4">
                  <i className="fa fa-2x fa-certificate text-white"></i>
                </div>
                <div className="mt-n1">
                  <h4>International Certificate</h4>
                  <p>
                    Labore rebum duo est Sit dolore eos sit tempor eos stet,
                    vero vero clita magna kasd no nonumy et eos dolor magna
                    ipsum.
                  </p>
                </div>
              </div>
              <div className="d-flex">
                <div className="btn-icon bg-warning mr-4">
                  <i className="fa fa-2x fa-book-reader text-white"></i>
                </div>
                <div className="mt-n1">
                  <h4>Online classes</h4>
                  <p className="m-0">
                    Labore rebum duo est Sit dolore eos sit tempor eos stet,
                    vero vero clita magna kasd no nonumy et eos dolor magna
                    ipsum.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-5" style={{ minHeight: "500px" }}>
              <div className="position-relative h-100">
                <img
                  src={FeatureImg}
                  alt="website template image"
                  className="position-absolute w-100 h-100"
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
                <h1 className="display-4">What Say Our Students</h1>
              </div>
              <p className="m-0">
                Dolor est dolores et nonumy sit labore dolores est sed rebum
                amet, justo duo ipsum sanctus dolore magna rebum sit et. Diam
                lorem ea sea at. Nonumy et at at sed justo est nonumy tempor.
                Vero sea ea eirmod, elitr ea amet diam ipsum at amet. Erat sed
                stet eos ipsum diam
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
                  <p style={{paddingLeft: "30px", paddingTop: "75px"}}>
                    Sed et elitr ipsum labore dolor diam, ipsum duo vero sed sit
                    est est ipsum eos clita est ipsum. Est nonumy tempor at
                    kasd. Sed at dolor duo ut dolor, et justo erat dolor magna
                    sed stet amet elitr duo lorem
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
