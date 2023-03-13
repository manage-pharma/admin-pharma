import React from "react";
import Sidebar from "./../components/Sidebar";
import Header from "./../components/Header";
import MainDrugStores from "./../components/DrugStores/MainDrugStores";


const DrugStoreScreen=({match}) => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainDrugStores />
      </main>
    </>
  );
};

export default DrugStoreScreen;

