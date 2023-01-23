import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import MainExportStock from '../components/ExportStock/MainExportStock';

const ProviderScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainExportStock/>
      </main>
    </>
  );
};

export default ProviderScreen;
