import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import EditContentMain from "../components/Content/EditContentMain";
import { useParams } from "react-router-dom";


const ContentEditScreen = ({match}) => {
  const {id} = useParams();
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <EditContentMain/>
        {/*<EditProductMain productId={id} />*/}
      </main>
    </>
  );
};
export default ContentEditScreen;
