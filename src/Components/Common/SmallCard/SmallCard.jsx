import React from "react";
import "./SmallCard.css";
import { FiFolder, FiGithub } from "react-icons/fi";
import { HiOutlineExternalLink } from "react-icons/hi";
import { Fade } from "react-awesome-reveal";

function SmallCard(props) {
  const { title, desc, deployedLink, githubLink, techList, i } = props;
  return (
    <Fade cascade direction="up" triggerOnce delay={i * 100}>
      <li className="project__inner">
        <header>
          <div className="project__top">
            <div className="folder">
              <FiFolder />
            </div>
            <div className="project__links">
              {githubLink !== "" && (
                <a href={githubLink} rel="noopener noreferrer" target="_blank">
                  <FiGithub />
                </a>
              )}
              {deployedLink && (
                <a
                  href={deployedLink}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <HiOutlineExternalLink
                    aria-label="External Link"
                    style={{ width: "25px", height: "25px" }}
                  />
                </a>
              )}
            </div>
          </div>
          <h3 className="project__title">
            <a href={githubLink} target="_blank" rel="noreferrer">
              {title}
            </a>
          </h3>
          <div style={{ fontSize: "17px" }} className="project__description">
            <p style={{ margin: "0 0 15px" }}>{desc}</p>
          </div>
        </header>
        <div>
          <ul className="project__tech__list">
            {techList?.map((tech, i) => {
              return <li key={i}>{tech}</li>;
            })}
          </ul>
        </div>
      </li>
    </Fade>
  );
}

export default SmallCard;
