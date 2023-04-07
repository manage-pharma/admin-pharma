import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { listCustomer, singleCustomer } from "../../Redux/Actions/CustomerActions";
import Loading from '../LoadingError/Loading';
import Message from '../LoadingError/Error';
import AddCustomer from "./AddCustomerModal";
import debounce from 'lodash.debounce';
import { useHistory } from 'react-router-dom';
import { withAuthorization } from "../../util/withAuthorization ";
import { PERMISSIONS } from "../../util/RolesContanst";
const CustomerComponent = (props) => {
  const dispatch = useDispatch();
  const customerList = useSelector(state => state.customerList);
  const { loading, error, customers } = customerList 
  const [show, setShow] = useState(false);
  const { pageNumber } = props
    const [keyword, setSearch] = useState()
    const history = useHistory()
    const callApiKeywordSearch = (keyword, pageNumber) =>{
        if( keyword.trim() !== ''){
          dispatch(listCustomer(keyword, pageNumber))
        }
        else{
          history.push('/customers');
        }
      }
    const debounceDropDown = useRef(debounce((keyword, pageNumber) => callApiKeywordSearch(keyword, pageNumber) , 300)).current;
    const handleSubmitSearch = e =>{
        setSearch(e.target.value)
        debounceDropDown(e.target.value, pageNumber);
      }
  const handleAdd = (e) =>{
    setShow(true)
  }
  useEffect(() => {
    dispatch((listCustomer()));
  }, [dispatch])
  const nameRole =  (role) => {
    if(role === "isAdmin"){
      return "Quản trị viên"
    }
    else if(role === "isInventory"){
      return "Nhân viên kho"
    }
    else if(role === "isSaleAgent"){
      return "Nhân viên bán hàng"
    }
  }
  return (
    <>
    <AddCustomer show={show} setShow={setShow}/>
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Danh sách người dùng</h2>
        <div>
          {/* <Link to="#" className="btn btn-primary">
            <i className="material-icons md-plus"></i> Create new
          </Link> */}
            <button onClick={handleAdd} className="btn btn-primary">
              Tạo mới
            </button>
        </div>
      </div>

      <div className="card card-custom mb-4 shadow-sm">
        <header className="card-header bg-aliceblue ">
          <div className="row gx-3 py-3">
            <div className="col-lg-4 col-md-6 me-auto">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="form-control"
                value={keyword}
                onChange={handleSubmitSearch}
              />
            </div>
          </div>
        </header>

        {/* Card */}
        <div className="card-body">
          {loading ? (<Loading />) : error ? (<Message variant="alert-danger" >{error}</Message>) : (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
              {
                customers.filter((customer) => !customer.isAdmin).map((customer, index) => (
                  <div className="col" key={index}>
                    <div className="card card-user shadow-sm">
                      <div className="card-header">
                        <div className="user-effect" onClick={e=>{
                          e.preventDefault();
                          dispatch(singleCustomer(customer._id))
                          setShow(true)
                        }}><i className="far fa-edit"></i></div>
                        <img
                          className="img-md img-avatar"
                          src="images/tpone.png"
                          // src="https://tpone.vn/webinfo_files/images/57c57e30-461d-11ed-a701-9b027010aa3d--XMLID_92_.png"
                          alt="Customer pic"
                        />
                      </div>
                      <div className="card-body">
                        <h5 className="card-title mt-5">{customer.name}</h5>
                        <div className="card-text text-muted">
                          {
                            customer?.role === "isAdmin" ? (
                              <p className="m-0 badge bg-danger" style={{fontSize: '16px'}}>{nameRole(customer?.role)}</p>
                            )
                            :
                            (
                              <p className="m-0 badge bg-primary text-wrap" style={{minWidth: '4rem', fontSize: '16px'}}>{nameRole(customer?.role)}</p>
                            )
                          }
                          <h6 className="mt-2 card-title">{customer.phone}</h6>
                          <p style={{fontWeight: "bold"}}>
                            <a href={`mailto:${customer.email}`}>{customer.email}</a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          )}
        </div>
      </div>
    </section>
    </>

  );
};

export default withAuthorization(CustomerComponent,[PERMISSIONS.isAdmin]);
