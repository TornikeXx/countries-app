import React from "react";
import { PropsWithChildren } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer/>
    </>
  )
};

export default Layout;
