import React from "react";
import Header from "../components/Header";
import Main from "../components/Home/Main";
import Sidebar from "./../components/Sidebar";

const HomeScreen = () => {
  
  return (
    <>
      <Sidebar />
      <main className="main-wrap" style={{height: 'auto'}}>
        <Header />
        <Main />
      </main>
    </>
  );
};

export default HomeScreen;
