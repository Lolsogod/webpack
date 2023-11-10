import * as React from "react"
import smile from "./images/smile.png"
import css from "./styles/main.css"

const Test = () => (
  <div className="cont" style={css}>
    <h1>Hello World!</h1>;
    <img src={smile} alt="смайлик" />
  </div>
);
export default Test;
