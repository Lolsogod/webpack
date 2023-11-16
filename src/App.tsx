
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import style from"./styles/main.module.scss";

const App = () => (
  <div className={style.container}>
    <Header />
    <Footer />
  </div>
);
export default App;
