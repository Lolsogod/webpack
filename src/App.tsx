import * as React from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import style from "./styles/main.css";

const App = () => (
  <div className="container" style={style}>
    <Header />
    <Footer />
  </div>
);
export default App;
