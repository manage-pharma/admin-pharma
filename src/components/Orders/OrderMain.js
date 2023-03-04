import React from "react";
import Orders from "./Orders";
import {useSelector} from 'react-redux'
import Loading from '../LoadingError/Loading';
import Message from '../LoadingError/Error'
const OrderMain = () => {
  const orderList = useSelector(state => state.orderList)
  const { loading, error, orders } = orderList;

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Danh sách đơn đặt hàng</h2>
      </div>

      <div className="card card-custom mb-4 shadow-sm">
        <header className="card-header bg-white">
          <div className="row gx-3 py-3">
            <div className="col-lg-4 col-md-6 me-auto">
              <input
                type="text"
                placeholder="Tìm kiếm đơn đặt hàng..."
                className="form-control p-2"
              />
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Trạng thái</option>
                <option>Hành động</option>
                <option>Disabled</option>
                <option>Show all</option>
              </select>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Hiển thị 20</option>
                <option>Show 30</option>
                <option>Show 40</option>
              </select>
            </div>
          </div>
        </header>
        <div className="card-body">
          <div className="table-responsive">
            {
              loading ? (<Loading />) : error ? (<Message>{error}</Message>)
                :
                <Orders orders={orders} />
            }
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderMain;
