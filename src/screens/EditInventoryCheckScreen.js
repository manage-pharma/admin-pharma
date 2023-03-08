import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import EditInventoryCheck from "../components/InventoryCheck/EditInventoryCheck";

const EditInventoryCheckScreen = () => {
  const {id} = useParams();
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <EditInventoryCheck importId={id}/>
      </main>
    </>
  );
};

export default EditInventoryCheckScreen;
