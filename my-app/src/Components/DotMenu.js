import React from "react";

// Dot Menu Component
export const DotMenu = (props) => {
  return (
    <nav className="nav-c ">
      {props.navText.map((e, i) => {
        return (
          <div className="nav-item-c" key={`nav-item${i}`}>
            <a
              className={`nav-link-c loadDots-${i} `}
              href={`${e[1]}`}
              onClick={(event) => {
                let section = document.getElementById(`${e[2]}`);
                section && section.scrollIntoView({ behavior: "smooth" });
                window.location.assign(`${e[1]}`);
                event.preventDefault();
              }}
            >
              <span className="visually-hidden">{e[0]}</span>
            </a>
            <span className="nav-label-c ">{e[0]}</span>
          </div>
        );
      })}
    </nav>
  );
};
