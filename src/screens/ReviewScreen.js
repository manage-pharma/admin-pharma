import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import MainReview from "../components/Reviews/MainReview";


const DrugStoreScreen=({match}) => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainReview />
      </main>
    </>
  );
};

export default DrugStoreScreen;

