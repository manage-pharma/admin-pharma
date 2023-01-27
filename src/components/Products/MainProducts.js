import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Loading from '../LoadingError/Loading';
import Message from '../LoadingError/Error';
import Product  from '../Products/Product'
import { listProduct } from "../../Redux/Actions/ProductActions";
import Pagination from "../LoadingError/Pagination";
import debounce from "lodash.debounce";
import Toast from './../LoadingError/Toast';
import { toast } from "react-toastify";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const MainProducts = (props) => {
  const { pageNumber } = props
  const dispatch = useDispatch()
  const history = useHistory()
  const [keyword, setSearch] = useState()
  const [sort, setSort] = useState()
  const productList = useSelector((state)=> state.productList)
  const { loading, error, products, currentPage, totalPage } = productList

  const productDelete = useSelector(state => state.productDelete)
  const { loading: loadingDelete, error: errorDelete, success: successDelete} = productDelete
  
  const handleSelected = (e)=>{
    e.preventDefault();
    let sortPrice = e.target.value
    dispatch(listProduct(keyword, pageNumber, sortPrice))
    setSort(e.target.value)
  }
  const callApiKeywordSearch = (keyword, pageNumber, sort) =>{
    if( keyword.trim() !== ''){
      dispatch(listProduct(keyword, pageNumber, sort))
    }
    else{
      history.push('/products');
    }
  }
  const debounceDropDown = useRef(debounce((keyword, pageNumber, sort) => callApiKeywordSearch(keyword, pageNumber, sort) , 300)).current;

  const handleSubmitSearch = e =>{
    setSearch(e.target.value)
    debounceDropDown(e.target.value, pageNumber, sort);
  }

  useEffect(()=>{
    if(successDelete){
      toast.success("Deleted successfully", ToastObjects);
    }
    else{
      dispatch(listProduct(keyword, pageNumber)) 
    }// eslint-disable-next-line
  },[dispatch, successDelete, pageNumber])

  return (
    <>
    <Toast />
    { loading || loadingDelete ? (<Loading/>) : error || errorDelete ? (<Message variant="alert-danger">{error || errorDelete}</Message>) : ''}
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">PRODUCTS</h2>
        <div className="d-flex">
          <div style={{marginRight: '10px'}}>
            <Link to="/product/excel" className="btn btn-primary">
              Excel & CSV 
            </Link>
          </div>
          <div>
            <Link to="/product/add" className="btn btn-primary">
              Create new
            </Link>
          </div>
        </div>
      </div>

      <div className="card card-custom mb-4 shadow-sm">
        <header className="card-header bg-white ">
          <div className="row gx-3 py-3">
            <div className="col-lg-4 col-md-6 me-auto ">
              <input
                type="search"
                placeholder="Search..."
                className="form-control p-2"
                value={keyword}
                onChange={handleSubmitSearch}
              />
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>All category</option>
                <option>Electronics</option>
                <option>Clothings</option>
                <option>Something else</option>
              </select>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select  defaultValue="" className="form-select" onChange={handleSelected}>
                <option value="">---Chosse Price---</option>
                <option value="cheap">(1$ - 100$)</option>
                <option value="expensive">(101$ - 1000$)</option>
              </select>
            </div>
          </div>
        </header>

        <div className="card-body">
          <div className="row">
              <div className="card card-custom mb-4 shadow-sm">
                <header className="card-header bg-white ">
                  <div className="row gx-3 py-3">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Id</th>
                          <th scope="col">Name</th>
                          <th scope='col'>Image</th>
                          <th scope="col">Category</th>
                          <th scope="col">Category Drug</th>
                          {/* <th scope="col">Unit</th>
                          <th scope="col">Capacity</th>
                          <th scope="col">Exp</th> */}
                          <th scope="col">Rest Exp</th>
                          <th scope="col">Price</th>
                          <th scope="col">Stock</th>
                          <th scope="col">Status</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                        <tbody>
                            {products && products.map((product, index)=>(
                          <Product product={product} key={index} indexSTT={index}/>))}
                        </tbody>
                      </table>
                  </div>
                </header>
              </div>
          </div>
          <Pagination 
            totalPage={totalPage} 
            currentPage={currentPage} 
            keyword={keyword ? keyword : ""}
            sort= {sort ? sort : ""}
          />
        </div>
      </div>
    </section>
    </>
  );
};

export default MainProducts;
