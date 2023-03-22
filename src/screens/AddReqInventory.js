import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import AddReqInventory from '../components/ReqInventory/AddReqInventory';

const AddRequestInventory = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <AddReqInventory />
      </main>
    </>
  );
};

export default AddRequestInventory;
