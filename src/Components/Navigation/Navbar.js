import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../Logo/Logo";
import Offcanvas from "react-bootstrap/Offcanvas";
import RohanCV from "../../Assets/Images/Rohan-CV.pdf";
import { Fade } from "react-awesome-reveal";

function NavigationBar() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const offcanvasRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setShowNavbar(prevScrollPos > currentScrollPos || currentScrollPos === 0);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  const handleCloseOffcanvas = () => {
    setShowOffcanvas(false);
  };

  const handleToggleOffcanvas = () => {
    setShowOffcanvas(!showOffcanvas);
  };

  const handleNavLinkClick = (id) => {
    handleCloseOffcanvas();
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <Navbar
      className={`home__navbar ${showNavbar ? "" : "hidden"}`}
      collapseOnSelect
      expand="lg"
      variant="light"
      bg="light"
    >
      <Container fluid className="m-2">
        <Fade triggerOnce direction="down" duration={700}>
          <Navbar.Brand href="/">
            <Logo />
          </Navbar.Brand>
        </Fade>
        <Navbar.Toggle
          as={Nav.Link}
          aria-controls="offcanvasNavbar-expand-md"
          onClick={handleToggleOffcanvas}
        />
        <Navbar.Offcanvas
          id="offcanvasNavbar-expand-md"
          aria-labelledby="offcanvasNavbarLabel-expand-md"
          placement="end"
          show={showOffcanvas}
          onHide={handleCloseOffcanvas}
          ref={offcanvasRef}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel-expand-md"></Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end align-items-center flex-grow-1 text-center">
              <Fade triggerOnce direction="down" duration={700} delay={200}>
                <span
                  className="nav-link"
                  onClick={() => handleNavLinkClick("about")}
                >
                  <span>01.</span>About
                </span>
              </Fade>
              <Fade triggerOnce direction="down" duration={700} delay={300}>
                <span
                  className="nav-link"
                  onClick={() => handleNavLinkClick("work")}
                >
                  <span>02.</span>Work
                </span>
              </Fade>
              <Fade triggerOnce direction="down" duration={700} delay={400}>
                <span
                  className="nav-link"
                  onClick={() => handleNavLinkClick("contact")}
                >
                  <span>03.</span>Contact
                </span>
              </Fade>
              <Fade triggerOnce direction="down" duration={700} delay={500}>
                <div className="resume-btn-wrapper" style={{ width: "100px" }}>
                  <a
                    className="primary-btn resume-btn"
                    href={RohanCV}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Resume
                  </a>
                </div>
              </Fade>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
