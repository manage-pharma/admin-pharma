import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import MainImportStock from './../components/ImportStock/MainImportStock';

const ProviderScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainImportStock/>
      </main>
    </>
  );
};

export default ProviderScreen;
