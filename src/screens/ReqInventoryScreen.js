import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import MainReqInventory from './../components/ReqInventory/MainReqInventory';

const ReqInventoryScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainReqInventory/>
      </main>
    </>
  );
};

export default ReqInventoryScreen;
