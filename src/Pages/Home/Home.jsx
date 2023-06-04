import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navigation/Navbar";
import LandingPage from "./LandingPage";
import About from "../About/About";
import Work from "../Work/Work";
import Contact from "../Contact/Contact";
import Footer from "../../Components/Footer/Footer";
import { BiUpArrowCircle } from "react-icons/bi";
import Aos from "aos";
import "aos/dist/aos.css";

function Home() {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [scrollPos, setScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      if (currentScrollPos > 1400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
      setScrollPos(currentScrollPos);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPos]);

  useEffect(() => {
    Aos.init({
      offset: 200,
      duration: 600,
      easing: "linear",
      delay: 100,
      anchorPlacement: "bottom-top",
    });
  }, []);

  return (
    <>
      <Navbar />
      <LandingPage />
      <About />
      <Work />
      <Contact />
      <Footer />
      {showTopBtn && (
        <button onClick={() => window.scrollTo(0, 0)} className="top__btn">
          <BiUpArrowCircle />
        </button>
      )}
    </>
  );
}

export default Home;
