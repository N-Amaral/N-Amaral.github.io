import React from "react";
import { useInView } from "react-intersection-observer";

//Projects Component

//Card / Carousel Component
const CarouselContent = (props) => {
  //Functions related to mouseEnter and mouseLeave effect on the card, hide/show the arrows/arrow
  const mouseEnter = () => {
    const btns = document.querySelectorAll("button");
    btns.forEach((node) => {
      if (node.classList.contains("carousel-control-prev") || node.classList.contains("carousel-control-next")) {
        node.classList.remove("not-visible");
        node.classList.add("is-visible");
      }
    });
  };
  const mouseLeave = () => {
    const btns = document.querySelectorAll("button");
    btns.forEach((node) => {
      if (node.classList.contains("carousel-control-prev") || node.classList.contains("carousel-control-next")) {
        node.classList.remove("is-visible");
        node.classList.add("not-visible");
      }
    });
  };
  //Card content itself, each card is set inside the carousel
  const Cards = props.content.map((text, i) => {
    return (
      <div className={`carousel-item ${i === 0 ? "active" : ""}`} key={i} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
        <div className="card card-light d-block justify-self-center text-center">
          <div className="card-body">
            <div className="card-title fw-semibold">{text[0]}</div>
            <div className="card-text">
              <p>{text[1]}</p>
              <a href={text[2]} target="_blank" rel="noreferrer" className="btn btn-primary ">
                {text[0]}
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  });
  return Cards;
};

// Carousel Component
const CardCarousel = (props) => {
  //after content is set returns carousel + control buttons + full content
  return (
    <div id="projectCarousel" className="carousel slide " data-bs-ride="carousel" data-bs-interval="8000">
      <div className="carousel-inner">
        <CarouselContent content={props.content} />
      </div>
      <button className="carousel-control-prev not-visible" type="button" data-bs-target="#projectCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next not-visible" type="button" data-bs-target="#projectCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

// Empty card as fallback for lack of projects
const EmptyCard = (props) => {
  const cardText = [
    ["Coming Soon", "Loading More Projects:"],
    ["Brevemente", "A Carregar Mais Projectos:"],
  ];
  return (
    <div className="card text-center card-light" id="card-empty">
      <div className="card-header fw-semibold">{`${props.lang === 0 || props.lang === undefined ? cardText[0][0] : cardText[1][0]} `}</div>
      <div className="card-body">
        <h5 className="card-title">{`${props.lang === 0 || props.lang === undefined ? cardText[0][1] : cardText[1][1]} `}</h5>
        <div className="progress card-text">
          <div
            className="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar"
            aria-label="Animated striped progress bar"
            aria-valuenow="75"
            aria-valuemin="0"
            aria-valuemax="100"
            id="progress-bar"
            style={{ width: "0%" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

//Final component for Projects
export const Projects = (props) => {
  const timeLoad = () => {
    const progressBar = document.getElementById("progress-bar");
    if (progressBar !== null) {
      progressBar.style.width = "75%";
    }
  };
  const { ref } = useInView({
    threshold: 0.5,
    onChange: (inView) => {
      const sections = document.querySelectorAll(".nav-link-c");
      const projects = document.getElementById("projects");

      if (inView) {
        timeLoad();
        sections.forEach((navlink) => {
          navlink.classList.remove("nav-link-selected");
          sections[2].classList.add("nav-link-selected");
          projects.childNodes.forEach((node) => {
            node.classList.remove("not-visible");
            node.classList.add("is-visible");
          });
        });
      } else {
        projects.childNodes.forEach((node) => {
          node.classList.remove("is-visible");
          node.classList.add("not-visible");
        });
      }
    },
  });
  if (props.projectText.length > 0) {
    return (
      <div className="section" id="projects" data-label="projects" ref={ref}>
        <CardCarousel content={props.projectText} />
      </div>
    );
  } else {
    return (
      <div className="section" id="projects" data-label="projects" ref={ref}>
        <EmptyCard lang={props.language} />
      </div>
    );
  }
};
