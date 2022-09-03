import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

// Hero Content Component
const Titles = (props) => {
  const Titles = props.greetText.map((title, i) => {
    return (
      <span className="titleContent text-wrap" id={`titleCard${i}`} key={i}>
        {title}
      </span>
    );
  });
  return Titles;
};

// Hero Component
export const Hero = (props) => {
  //function responsible for the underline effect in the content
  const lastWord = () => {
    const content = document.querySelectorAll(".titleContent");
    const language = props.language;
    if (language === 0) {
      content[content.length - 1].innerHTML = `I am <span class='colorFade'>Nuno</span>`;
    } else {
      content[content.length - 1].innerHTML = `Eu sou o <span class='colorFade'>Nuno</span>`;
    }
  };

  //function that evaluates time of day for user and returns proper greeting
  const greet = () => {
    //variable declaration
    const date = new Date();
    const time = date.getHours();
    const greetings = props.greetTime;
    const text = props.greetText;
    const content = document.querySelectorAll(".titleContent");

    //checks language and then time, afterwards returns appropriate greeting
    time >= 6 && time < 13
      ? (content[1].innerHTML = `${greetings[0]} ${text[1]}`)
      : time >= 13 && time <= 19
      ? (content[1].innerHTML = `${greetings[1]} ${text[1]}`)
      : (content[1].innerHTML = `${greetings[2]} ${text[1]}`);
  };

  useEffect(() => {
    lastWord();
    greet();
  });

  const { ref } = useInView({
    threshold: 0.5,
    onChange: (inView) => {
      const sections = document.querySelectorAll(".nav-link-c");
      const main = document.getElementById("main");

      if (inView) {
        sections.forEach((navlink) => navlink.classList.remove("nav-link-selected"));
        sections[0].classList.add("nav-link-selected");
        main.firstChild.classList.remove("not-visible");
        main.firstChild.classList.add("is-visible");
      } else {
        main.firstChild.classList.remove("is-visible");
        main.firstChild.classList.add("not-visible");
      }
    },
  });

  return (
    <div className="section" id="main" data-label="main" ref={ref}>
      <div className="card not-visible card-light" id="heroDiv">
        <div className="card-body">
          <Titles greetText={props.greetText} language={props.language} greetTime={props.greetTime} />
        </div>
      </div>
    </div>
  );
};
