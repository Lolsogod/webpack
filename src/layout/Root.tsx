import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./Header";

const Root = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <ToastContainer theme="dark"/>
    </>
  );
};

export default Root;
