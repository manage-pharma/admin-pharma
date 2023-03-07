import React,{useEffect} from "react";
//import {useDispatch,useSelector} from "react-redux";
import Sidebar from "./../components/Sidebar";
import Header from "./../components/Header";
import MainDrugStores from "./../components/DrugStores/MainDrugStores";
//import {listDrugStore,singleDrugStore} from "../Redux/Actions/DrugStoreActions";

const DrugStoreScreen=({match}) => {
  //const dispatch=useDispatch()

  const pageNumber=match.params.pageNumber
  useEffect(() => {
    //dispatch(listDrugStore())
    //dispatch(singleDrugStore("64057fd62eecee1db9c29903"))
  })
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainDrugStores pageNumber={pageNumber} />
      </main>
    </>
  );
};

export default DrugStoreScreen;

//import React from "react";
//import Sidebar from "../components/Sidebar";
//import Header from "../components/Header";
//import MainInventory from "../components/Inventories/InventoryMain";
//const DrugStoreScreen=() => {
//  return (
//    <>
//      <Sidebar />
//      <main className="main-wrap">
//        <Header />
//        <MainInventory />
//      </main>
//    </>
//  );
//};
//export default DrugStoreScreen;
