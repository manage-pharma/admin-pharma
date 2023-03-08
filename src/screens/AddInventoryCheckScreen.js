import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import AddInventoryCheck from '../components/InventoryCheck/AddInventoryCheck';
const AddInventoryCheckScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <AddInventoryCheck />
      </main>
    </>
  );
};

export default AddInventoryCheckScreen;
