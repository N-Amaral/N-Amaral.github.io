import React from "react";

/* import components */
import { ModeContainer } from "./ModeContainer";
import { DotMenu } from "./DotMenu";
import { Hero } from "./Hero";
import { About } from "./About";
import { Projects } from "./Projects";
import { Contact } from "./Contact";
import { Footer } from "./Footer";

/*import state from file*/
import { state } from "../state-data";

//App Component
class App extends React.Component {
  state = state;

  constructor(props) {
    super(props);
    this.langHandler = this.langHandler.bind(this);
    this.switchMode = this.switchMode.bind(this);
  }

  // changes dark and light mode
  switchMode() {
    const icon = document.getElementById("icon-bulb");
    const sections = document.querySelectorAll(".section");
    const body = document.querySelector("body");
    const cards = document.querySelectorAll(".card");

    // sets variable theme in localstorage and effects changes to the various parts of the website.
    const setDark = () => {
      localStorage.setItem("theme", "dark");
      document.documentElement.setAttribute("data-theme", "dark");
      icon.classList.remove("bi-lightbulb-off");
      icon.classList.add("bi-lightbulb");
      body.classList.add("body-dark");
      sections.forEach((section) => {
        section.classList.add("section-dark");
      });
      cards.forEach((card) => {
        card.classList.add("card-dark");
        card.classList.remove("card-light");
      });
    };

    const setLight = () => {
      body.classList.remove("body-dark");
      localStorage.setItem("theme", "light");
      document.documentElement.setAttribute("data-theme", "light");
      icon.classList.remove("bi-lightbulb");
      icon.classList.add("bi-lightbulb-off");
      sections.forEach((section) => {
        section.classList.remove("section-dark");
      });
      cards.forEach((card) => {
        card.classList.remove("card-dark");
        card.classList.add("card-light");
      });
    };

    // reads stored theme in order to properly switch.
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme === "light" || storedTheme === "") {
      setDark();
    } else {
      setLight();
    }
  }

  //checks for stored dark/light in localStorage and updates ui
  checkMode() {
    const storedTheme = localStorage.getItem("theme") === null ? "dark" : localStorage.getItem("theme");
    const icon = document.getElementById("icon-bulb");
    const sections = document.querySelectorAll(".section");
    const body = document.querySelector("body");
    const cards = document.querySelectorAll(".card");

    const isLight = () => {
      body.classList.remove("body-dark");
      icon.classList.remove("bi-lightbulb");
      icon.classList.add("bi-lightbulb-off");
      sections.forEach((section) => {
        section.classList.remove("section-dark");
      });
      cards.forEach((card) => {
        card.classList.remove("card-dark");
        card.classList.add("card-light");
      });
    };

    const isDark = () => {
      icon.classList.remove("bi-lightbulb-off");
      icon.classList.add("bi-lightbulb");
      body.classList.add("body-dark");
      sections.forEach((section) => {
        section.classList.add("section-dark");
      });
      cards.forEach((card) => {
        card.classList.add("card-dark");
        card.classList.remove("card-light");
      });
    };

    if (storedTheme === "light") {
      isLight();
    } else {
      isDark();
    }
  }

  // changes text language and language state
  langHandler() {
    const langBtn = document.getElementById("en-button");
    if (langBtn.innerHTML === "EN") {
      localStorage.setItem("language", "PT");
      document.documentElement.setAttribute("lang", "PT");
      langBtn.innerHTML = "PT";
      this.setState({
        lang: 1,
      });
    } else {
      localStorage.setItem("language", "EN");
      document.documentElement.setAttribute("lang", "EN");
      langBtn.innerHTML = "EN";
      this.setState({
        lang: 0,
      });
    }
  }
  //checks for stored Language, sets state based on value
  checkLang() {
    const storedLang = localStorage.getItem("language") === null ? "EN" : localStorage.getItem("language");
    const langBtn = document.getElementById("en-button");
    if (storedLang === "EN") {
      langBtn.innerHTML = "EN";
      document.documentElement.setAttribute("lang", "EN");
      this.setState({
        lang: 0,
      });
    } else {
      langBtn.innerHTML = "PT";
      document.documentElement.setAttribute("lang", "PT");
      this.setState({
        lang: 1,
      });
    }
  }

  componentDidMount() {
    this.checkMode();
    this.checkLang();
  }

  render() {
    const { lang, textPt, textEng } = this.state;
    if (lang === 0) {
      return (
        <div className="content" id="myContent">
          <ModeContainer language={lang} langHandler={this.langHandler} switchMode={this.switchMode} />
          <DotMenu navText={textEng.navText} />
          <Hero greetText={textEng.greetText} navText={textEng.navText} language={lang} greetTime={textEng.greetTime} />
          <About aboutText={textEng.aboutTexts} language={lang} />
          <Projects projectText={textEng.projectText} language={lang} />
          <Contact contacts={textEng.contactText} />
          <Footer />
        </div>
      );
    } else {
      return (
        <div className="content" id="myContent">
          <ModeContainer language={lang} langHandler={this.langHandler} switchMode={this.switchMode} />
          <DotMenu navText={textPt.navText} />
          <Hero greetText={textPt.greetText} navText={textPt.navText} language={lang} greetTime={textPt.greetTime} />
          <About aboutText={textPt.aboutTexts} language={lang} />
          <Projects projectText={textPt.projectText} language={lang} />
          <Contact contacts={textPt.contactText} />
          <Footer />
        </div>
      );
    }
  }
}

export default App;
