import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import EditContentMain from "../components/Content/EditContentMain";

const ContentEditScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <EditContentMain/>
      </main>
    </>
  );
};
export default ContentEditScreen;
