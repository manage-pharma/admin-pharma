import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import MainPromotion from "../components/Promotion/MainPromotion";

const PromotionScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainPromotion />
      </main>
    </>
  );
};

export default PromotionScreen;
