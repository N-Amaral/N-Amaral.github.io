import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

// Cards/Content Component
const Cards = (props) => {
  //initialize the values with current viewport
  const viewPort = { width: window.innerWidth, height: window.innerHeight };
  const [size, setSize] = useState({ ...viewPort });
  //Function responsible for updanting values
  const resizeHandler = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    setSize({
      width: width,
      height: height,
    });
  };

  useEffect(() => {
    //Listening for the window resize event
    window.addEventListener("resize", resizeHandler);
    //clean up, removes Ev listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  //Full card content
  const CardContent = props.content.map((text, i) => {
    return (
      <div className="contactCard" key={i}>
        <div className="face face1">
          <div className="contentCard">
            <div className="iconCard">
              <a href={`${text[1]}`} target={"_blank"} rel="noreferrer">
                <i className={`bi ${text[0]}`} aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="face face2">
          <div className="contentCard">
            <h3>
              <a href={`${text[1]}`} target={"_blank"} rel="noreferrer">
                {`${text[2]}`}
              </a>
            </h3>
            <p>{text[3]}</p>
          </div>
        </div>
      </div>
    );
  });

  //Reduced Card content
  const CardContentReduce = props.content.map((text, i) => {
    return (
      <div className="contactCard" key={i}>
        <div className="face face1">
          <div className="contentCard">
            <div className="iconCard">
              <a href={`${text[1]}`} target={"_blank"} rel="noreferrer">
                <i className={`bi ${text[0]}`} aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  });

  //conditional return of each card based on width value

  if (!size || (size.width > 570 && size.height > 500) || (size.height > 500 && size.width > 954)) {
    return CardContent;
  } else {
    return CardContentReduce;
  }
};

const Socials = (props) => {
  return (
    <div className="containerCard">
      <Cards content={props.content} />
    </div>
  );
};

// Contacts Component
export const Contact = (props) => {
  const { ref } = useInView({
    threshold: 0.5,
    onChange: (inView) => {
      const sections = document.querySelectorAll(".nav-link-c");
      const contactMe = document.getElementById("contactMe");
      const footer = document.getElementById("footer-end");

      if (inView) {
        sections.forEach((navlink) => navlink.classList.remove("nav-link-selected"));
        sections[3].classList.add("nav-link-selected");
        contactMe.firstChild.classList.remove("not-visible");
        contactMe.firstChild.classList.add("is-visible");
        contactMe.firstChild.classList.remove("not-visible");
        footer.classList.add("is-visible");
        footer.classList.remove("not-visible");
      } else {
        contactMe.firstChild.classList.remove("is-visible");
        contactMe.firstChild.classList.add("not-visible");
        footer.classList.add("not-visible");
      }
    },
  });

  return (
    <div className="section " id="contactMe" data-label="contactMe" ref={ref}>
      <Socials content={props.contacts} />
    </div>
  );
};
