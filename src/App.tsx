import style from "@/styles/main.module.scss";
import { RouterProvider } from "react-router-dom";
import router from "@/router/router";

const App = () => {
  return (
    <div className={style.container}>
      <RouterProvider router={router} />  
    </div>
  );
};
export default App;
