import React from "react";
import "./About.css";
import { GoTriangleRight } from "react-icons/go";
import { Container, Row, Col } from "react-bootstrap";

function About() {
  return (
    <Container fluid id="about" data-aos="fade-up">
      <h2 className="number-heading">
        <span>01.</span> About Me
      </h2>
      <Row className="mt-5">
        <Col className="col-12 col-lg-6">
          <p>
            Hello! My name is Rohan Rana Magar and I enjoy creating things that
            live on the internet. My interest in web development started back in
            2020 when I go through a website that pop up as advertisement on
            Youtube.
          </p>
          <p>
            I'm a passionate and a keen learner to make a significant
            contribution to the success of the company.
          </p>
          <p>Here are a few technologies I've been working with recently:</p>
          <ul>
            <li>
              <span>
                <GoTriangleRight />
              </span>
              Express.js
            </li>
            <li>
              <span>
                <GoTriangleRight />
              </span>
              Node.js
            </li>
            <li>
              <span>
                <GoTriangleRight />
              </span>
              Javascript (ES6+)
            </li>
            <li>
              <span>
                <GoTriangleRight />
              </span>
              React
            </li>
            <li>
              <span>
                <GoTriangleRight />
              </span>
              Bootstrap
            </li>
            <li>
              <span>
                <GoTriangleRight />
              </span>
              Figma
            </li>
          </ul>
        </Col>
        <Col className="col-12 col-lg-6 d-flex justify-content-center mb-3">
          <div className="image__wrapper">
            <img
              src={require("../../Assets/Images/rohan.jpg")}
              alt="profile-img"
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default About;
