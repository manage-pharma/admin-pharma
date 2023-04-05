import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopTotal from "./TopTotal";
import LatestOrder from "./LatestOrder";
import SaleStatistics from "./SalesStatistics";
import ProductsStatistics from "./ProductsStatistics";
import OrderStatistics from "./OrderStatistics";
import {listOrder,searchListOrder } from "../../Redux/Actions/OrderActions"
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";

import Toast from '../LoadingError/Toast';
import renderToast from "../../util/Toast";

const Main = () => {
  const dispatch = useDispatch()
  //const orderList = useSelector(state => state.orderList)
  //const { loading, error, orders:ordersList,success:successList } = orderList;


  const orderSearchList = useSelector(state => state.orderSearchList)
  const { loading,error, orders:ordersSearch,success:successSearch } = orderSearchList;


  const productList = useSelector(state => state.productList)
  const { products} = productList
  
  const [ isStop , setIsStop ] = useState(false)
  const [toggleSearch, setToggleSearch] = useState(false)
  const [isSearch, setIsSearch] = useState(false)
  const [data, setData] = useState({
    from: '',
    to: ''
  })
  const [orders,setOrders] = useState([])
  const {from,to} = data

  const handleChange = e =>{
    e.preventDefault();
    setData(prev => {
      return {
        ...prev, [e.target.name]: e.target.value
      }
    })
    if(toggleSearch) dispatch(searchListOrder(data.from,data.to))   
  }
  const handleSearchDate = (e) =>{
    e.preventDefault();
    if(!toggleSearch){
      if(!data.from || !data.to){
        if(!isStop){
          renderToast('Chưa chọn ngày','error', setIsStop, isStop)
        }
        return;
      }
      //dispatch(listInventory(keyword, data.from, data.to)) 
      dispatch(searchListOrder(data.from,data.to))
    }
    else{//nút cancel->click
      setData({
        from: '',
        to: ''
      })
      
      dispatch(searchListOrder(data.from,data.to))//
    }
    setToggleSearch(!toggleSearch)
    setIsSearch(!isSearch)
  }
  useEffect(()=>{
    if(successSearch)
       setOrders(ordersSearch)
    
  },[successSearch])

  useEffect(()=>{
    dispatch(searchListOrder(data.from,data.to))   
  },[toggleSearch])


 


  console.log({data,ordersSearch,orders});



  
  return (
    <>
      <Toast/>
      
      <section className="content-main">
        <div className="content-header">
          <h2 className="content-title"><span className="u-text-mark">Trang chủ</span></h2>
        </div>

        <div className="row p-4">
          <div className="col-lg-7"></div>

          <div className="col-lg-2 col-6 col-md-3">
            <div className="d-flex">
              <span className="label-date">Từ: </span>
              <input
                  id="datePicker"
                  name="from"
                  value={from}
                  className="form-control"
                  type='date'
                  onChange={handleChange}
              ></input>
            </div>
          </div>
          <div className="col-lg-2 col-6 col-md-3">
            <div className="d-flex">
              <span className="label-date">Đến: </span>
              <input
                  id="datePicker"
                  name="to"
                  value={to}
                  className="form-control"
                  type='date'
                  onChange={handleChange}
              ></input>
            </div>
          </div>
          <div className="col-lg-1">
            {toggleSearch ? 
              <button className="btn btn-danger" onClick={handleSearchDate}>Hủy</button>
            : 
              <button className="btn btn-success" onClick={handleSearchDate}>Tìm</button>
            }
          </div>
        </div>
        {
        loading ? (<Loading />) : error? (<Message>{error}</Message>) :
        
          <>
          {/* Top Total */}
          <TopTotal orders= {ordersSearch} products={products}/>

          <div className="row">
            {/* STATICS */}
            <SaleStatistics />
            <ProductsStatistics />
          </div>

          {/* LATEST ORDER */}
          <div className="card card-custom mb-4 shadow-sm">
            <LatestOrder orders= {ordersSearch} loading={loading} error={error}/>
          </div>

          {/* LATEST ORDER */}
          <div className="card card-custom mb-4 shadow-sm">
            <OrderStatistics orders= {ordersSearch} loading={loading} error={error}/>
          </div>
          </>
        }
      </section>
    </>
    //<>
    // <div className="col-lg-2 col-6 col-md-3">
    //        <div className="d-flex">
    //          <span className="label-date">Từ: </span>
    //          <input
    //              id="datePicker"
    //              name="from"
    //              value={from}
    //              className="form-control"
    //              type='date'
    //              onChange={handleChange}
    //          ></input>
    //        </div>
    //      </div>
    //      <div className="col-lg-2 col-6 col-md-3">
    //        <div className="d-flex">
    //          <span className="label-date">Đến: </span>
    //          <input
    //              id="datePicker"
    //              name="to"
    //              value={to}
    //              className="form-control"
    //              type='date'
    //              onChange={handleChange}
    //          ></input>
    //        </div>
    //      </div>
    //      <div className="col-lg-1">
    //        {toggleSearch ? 
    //          <button className="btn btn-danger" onClick={handleSearchDate}>Cancel</button>
    //        : 
    //          <button className="btn btn-success" onClick={handleSearchDate}>Search</button>
    //        }
    //      </div>
    
    //</>
  );
};

export default Main;
