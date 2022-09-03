import React from "react";
import { useInView } from "react-intersection-observer";

// About Me Component

// carousel buttons component
const CarouselBtns = (props) => {
  const btns = props.text.map((slide, i) => {
    return (
      <button
        type="button"
        data-bs-target="#aboutCarousel"
        data-bs-slide-to={i}
        className={`${i === 0 ? "active" : ""} `}
        key={i}
        aria-current="true"
        aria-label={`slide ${i + 1}`}
      ></button>
    );
  });
  return <div className="carousel-indicators">{btns}</div>;
};

//card text component
const CardText = (props) => {
  const content = props.text.map((text, i) => {
    return (
      <p className={`carousel-item  ${i === 0 ? "active" : ""} text-wrap text-start`} key={i}>
        {text}
      </p>
    );
  });
  return <div className="carousel-inner text-wrap">{content}</div>;
};

// actual about section including carousel of cards
export const About = (props) => {
  const { ref } = useInView({
    threshold: 0.5,
    onChange: (inView) => {
      const sections = document.querySelectorAll(".nav-link-c");
      const aboutMe = document.getElementById("aboutMe");

      if (inView) {
        sections.forEach((navlink) => navlink.classList.remove("nav-link-selected"));
        sections[1].classList.add("nav-link-selected");
        aboutMe.firstChild.classList.remove("not-visible");
        aboutMe.firstChild.classList.add("is-visible");
      } else {
        aboutMe.firstChild.classList.remove("is-visible");
        aboutMe.firstChild.classList.add("not-visible");
      }
    },
  });
  return (
    <div className="section " id="aboutMe" data-label="aboutMe" ref={ref}>
      <div className="card not-visible card-light">
        <div className="card-header text-center fw-semibold">{props.language === 0 ? "About Me" : "Sobre Mim"} </div>
        <div className="card-body">
          <div className="card-text">
            <div id="aboutCarousel" className="carousel slide" data-bs-ride="true" data-bs-interval="8000">
              <CardText text={props.aboutText} />
              <CarouselBtns text={props.aboutText} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
