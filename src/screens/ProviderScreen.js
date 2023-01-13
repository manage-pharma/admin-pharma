import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import MainProvider from './../components/Provider/MainProvider';

const ProviderScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainProvider/>
      </main>
    </>
  );
};

export default ProviderScreen;
