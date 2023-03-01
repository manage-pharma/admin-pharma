import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import MainInventory from "../components/Inventories/InventoryMain";
const DrugStoreScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainInventory/>
      </main>
    </>
  );
};
export default DrugStoreScreen;
