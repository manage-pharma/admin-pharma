import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import MainInventoryCheck from "../components/InventoryCheck/MainInventoryCheck";


const InventoryCheckScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainInventoryCheck/>
      </main>
    </>
  );
};

export default InventoryCheckScreen;
