import React, { useEffect } from "react";
import OrderDetailProducts from "./OrderDetailProducts";
import OrderDetailInfo from "./OrderDetailInfo";
import { Link} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails,getOrderConform ,getOrderCanceled,getOrderReceived} from "../../Redux/Actions/OrderActions";
import { getOrderDelivered } from '../../Redux/Actions/OrderActions';
import Message from '../LoadingError/Error';
import Loading from '../LoadingError/Loading';
import moment from 'moment/moment';

const OrderDetailMain = (props) => {
  const {orderId} = props;
  const dispatch = useDispatch()

  const orderDetail = useSelector((state)=> state.orderDetail)
  const {loading, error, orderItems} = orderDetail

  const orderDelivered = useSelector((state)=> state.orderDelivered)
  const {loading: loadingDelivered, success: successDelivered} = orderDelivered

  const orderCanceled = useSelector((state)=> state.orderCanceled)
  const {loading: loadingCanceled, success: successCanceled} = orderCanceled

  const orderReceived = useSelector((state)=> state.orderReceived)
  const {loading: loadingReceived, success: successReceived} = orderReceived

  const orderConform = useSelector((state)=> state.orderConform)
  const {loading: loadingConform, success: successConform} = orderConform


  console.log({successDelivered,successConform,successCanceled,successReceived});

  useEffect(()=>{
    dispatch(getOrderDetails(orderId))
  },[dispatch, orderId, successDelivered,successCanceled,successReceived,successConform])
  
  const deliveredHanlder = ((e)=>{ 
    e.preventDefault()
    dispatch(getOrderDelivered(orderItems))
  })
  const conformHanlder = ((e)=>{ 
    e.preventDefault()
    dispatch(getOrderConform(orderItems))
  })
  const canceledHanlder = ((e)=>{ 
    e.preventDefault()
    dispatch(getOrderCanceled(orderItems))
  })
  const receivedHanlder = ((e)=>{ 
    e.preventDefault()
    dispatch(getOrderReceived(orderItems))
  })
  return (
    <section className="content-main">
      <div className="content-header">
        <Link to="/orders" className="btn btn-dark text-white">
          Quay về danh sách đơn đặt hàng
        </Link>
      </div>
      { loading ? <Loading/> : error ? <Message variant="alert-danger">{error}</Message> : (
        <div className="card">
        <header className="card-header p-3 Header-green">
          <div className="row align-items-center ">
            <div className="col-lg-6 col-md-6">
              <span>
                <i className="far fa-calendar-alt mx-2"></i>
                <b className="text-white">
                  {moment(orderItems.createdAt).format("llll")}
                </b>
              </span>
              <br />
              <small className="text-white mx-3 ">
                ID đơn đặt hàng: {orderItems._id}
              </small>
            </div>
            <div className="col-lg-6 col-md-6 ms-auto d-flex justify-content-end align-items-center">
              <select
                className="form-select d-inline-block"
                style={{ maxWidth: "200px" }}
              >
                <option>Change status</option>
                <option>Awaiting payment</option>
                <option>Confirmed</option>
                <option>Shipped</option>
                <option>Delivered</option>
              </select>
              <Link className="btn btn-success ms-2" to="#">
                <i className="fas fa-print"></i>
              </Link>
            </div>
          </div>
        </header>
        <div className="card-body">
          {/* Order info */}
          <OrderDetailInfo order={orderItems}/>

          <div className="row">
            <div className="col-lg-9">
              <div className="table-responsive">
                <OrderDetailProducts order={orderItems} loading={loading}/>
              </div>
            </div>
            {/* Payment Info */}
            <div className="col-lg-3">
              <div className="box shadow-sm bg-light">
                {
                  orderItems.isComformed?
                  <>
                    {
                      orderItems.isComformed? (
                        <button className="btn btn-success col-12 mt-2">
                          {`ĐÃ XÁC NHẬN  ${moment(orderItems.conformedAt).format("MMM Do YY")}`}
                        </button>
                      ) :
                        <>
                          {loadingConform && <Loading/>}
                          <button onClick={conformHanlder} className="btn btn-dark col-12 user-select-none mt-2">
                            XÁC NHẬN ĐƠN HÀNG
                          </button>
                        </>        
                    }
                    {
                      (orderItems.isDelivered && orderItems.isPaid)||(orderItems.isDelivered && orderItems.paymentMethod=="COD") ? (
                        <button className="btn btn-success col-12 mt-2">
                          {`ĐÃ GIAO ${moment(orderItems.isDeliveredAt).format("MMM Do YY")}`}
                        </button>
                      ) : !orderItems.isPaid&& orderItems.paymentMethod=="COD"?
                          <>
                            <div className="btn btn-success col-12 pe-none mt-2"> 
                              TRẢ SAU
                            </div>
                          </>
                          :
                          !orderItems.isPaid&& orderItems.paymentMethod=="Paypal" ? (
                            <>
                              <div className="btn btn-danger col-12 pe-none mt-2"> 
                                CHƯA TRẢ
                              </div>
                            </>
                          ) : ""
                                         
                    }
                    {
                      orderItems.isComformed&&orderItems.isPaid&&!orderItems.isDelivered||
                      orderItems.isComformed&&!orderItems.isPaid&&orderItems.paymentMethod=="COD"&&!orderItems.isDelivered?
                        <>
                          {loadingDelivered && <Loading/>}
                          <button onClick={deliveredHanlder} className="btn btn-dark col-12 user-select-none mt-2">
                            VẬN CHUYỂN
                          </button>
                        </>
                        :""
                    }
                    {
                      orderItems.isReceived?""
                      :
                      <>
                        {
                          orderItems.isCanceled? (
                            <button className="btn btn-success col-12 mt-2">
                              {`ĐÃ HỦY  ${moment(orderItems.canceledAt).format("MMM Do YY")}`}
                            </button>
                          ) :
                            <>
                              {loadingCanceled && <Loading/>}
                              <button onClick={canceledHanlder} className="btn btn-dark col-12 user-select-none mt-2">
                                HỦY ĐƠN
                              </button>
                            </>        
                        }
                      </>
                    }

                  </>
                  
                  :
                  <>
                    {
                        orderItems.isComformed? (
                          <button className="btn btn-success col-12 mt-2">
                            {`ĐÃ XÁC NHẬN  ${moment(orderItems.conformedAt).format("MMM Do YY")}`}
                          </button>
                        ) :
                          <>
                            {loadingConform && <Loading/>}
                            <button onClick={conformHanlder} className="btn btn-dark col-12 user-select-none mt-2">
                              XÁC NHẬN ĐƠN HÀNG
                            </button>
                          </>        
                      }
                  </>
                }
                {
                  (orderItems.isReceived)? (
                    <button className="btn btn-success col-12 mt-2">
                      {`ĐÃ NHẬN HÀNG ${moment(orderItems.receivedAt).format("MMM Do YY")}`}
                    </button>
                  ) :""
                     
                }



                {/*{
                  !orderItems.isComformed?""
                  :
                  <>
                    {
                      orderItems.isCanceled?"":
                      <>  
                        {
                          (orderItems.isReceived)? (
                            <button className="btn btn-success col-12 mt-2">
                              {`ĐÃ NHẬN HÀNG ${moment(orderItems.receivedAt).format("MMM Do YY")}`}
                            </button>
                          ) ://""
                            <>
                              {loadingConform && <Loading/>}
                              <button onClick={receivedHanlder} className="btn btn-dark col-12 user-select-none mt-2">
                                ĐÃ NHẬN HÀNG
                              </button>
                            </>        
                        }
                      </>
                    }
                
                  </>
                }*/}
               
              </div>

              
            </div>
          </div>
        </div>
      </div>
      )}
    </section>
  );
};

export default OrderDetailMain;
