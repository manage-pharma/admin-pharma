import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Loading from '../LoadingError/Loading';
import Message from '../LoadingError/Error';
import Product  from '../Products/Product'
import { listProduct } from "../../Redux/Actions/ProductActions";
import Pagination from "../LoadingError/Pagination";
import debounce from "lodash.debounce";

const MainProducts = (props) => {
  const { pageNumber } = props
  const dispatch = useDispatch()
  const history = useHistory()
  const [keyword, setSearch] = useState()
  const [sort, setSort] = useState()
  const productList = useSelector((state)=> state.productList)
  const { loading, error, products, currentPage, totalPage } = productList

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
    dispatch(listProduct(keyword, pageNumber))
  },[dispatch, pageNumber])

  return (
    <>
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">PRODUCTS</h2>
        <div className="d-flex">
          <div style={{marginRight: '10px'}}>
            <Link to="/products/excel&CSV" className="btn btn-primary">
              Excel & CSV 
            </Link>
          </div>
          <div>
            <Link to="/addproduct" className="btn btn-primary">
              Create new
            </Link>
          </div>
        </div>
      </div>

      <div className="card mb-4 shadow-sm">
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
          { loading ? (<Loading/>) : error ? (<Message variant="alert-danger">{error}</Message>) : (
            <div className="row">{
              products && products.map((product, index)=>(
                <Product product={product} key={index}/>
              ))
            }</div>
          )}

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
