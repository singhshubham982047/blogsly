import React from "react";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";

const Layout = () => (WrappedComponent) => {
  return (props) => {
    return (
      <>
        <NavBar />
        <WrappedComponent {...props} />
        <Footer />
      </>
    );
  };
};

export default Layout;
