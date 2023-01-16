import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Loading from '../LoadingError/Loading';
import Message from '../LoadingError/Error';
import Pagination from "../LoadingError/Pagination";
import debounce from "lodash.debounce";
import ImportStock from "./ImportStock";
import { listImportStock } from "../../Redux/Actions/ImportStockAction";

const MainImportStock = (props) => {
  const { pageNumber } = props
  const dispatch = useDispatch()
  const history = useHistory()
  const [keyword, setSearch] = useState()
  const importedStockList = useSelector((state)=> state.importStockList)
  const { loading, error, importStock, currentPage, totalPage } = importedStockList

  const callApiKeywordSearch = (keyword, pageNumber) =>{
    if( keyword.trim() !== ''){
      dispatch(listImportStock(keyword, pageNumber))
    }
    else{
      history.push('/import-stock');
    }
  }
  const debounceDropDown = useRef(debounce((keyword, pageNumber) => callApiKeywordSearch(keyword, pageNumber) , 300)).current;

  const handleSubmitSearch = e =>{
    setSearch(e.target.value)
    debounceDropDown(e.target.value, pageNumber);
  }

  const handleAdd = (e) =>{
    e.preventDefault();
    history.push('/stock/import');
  }

  useEffect(()=>{
    dispatch(listImportStock(keyword, pageNumber)) // eslint-disable-next-line
  },[dispatch, pageNumber])

  return (
    <>
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Import Stock from Provider</h2>
          <div>
            <button onClick={handleAdd} className="btn btn-primary">
              Create new
            </button>
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
              <select  defaultValue="" className="form-select">
                <option value="">---Chosse Price---</option>
                <option value="cheap">(1$ - 100$)</option>
                <option value="expensive">(101$ - 1000$)</option>
              </select>
            </div>
          </div>
        </header>

        <div className="card-body">
          { loading ? (<Loading/>) : error ? (<Message variant="alert-danger">{error}</Message>) : (
            <div className="row">
                <div className="card card-custom mb-4 shadow-sm">
                  <header className="card-header bg-white ">
                    <div className="row gx-3 py-3">
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Import Code</th>
                            <th scope='col'>Provider</th>
                            <th scope="col">Total price</th>
                            <th scope="col">Created At</th>
                            <th scope="col">User created</th>
                          </tr>
                        </thead>
                          <tbody>
                             {importStock ? importStock.map((listImport, index)=>(
                              <ImportStock 
                                importStock={listImport} 
                                indexSTT={index} 
                                />)) : 
                              <div>There are no record</div>
                          }
                          </tbody>
                        </table>
                    </div>
                  </header>
                </div>
            </div>
          )}

          <Pagination 
            totalPage={totalPage} 
            currentPage={currentPage} 
            keyword={keyword ? keyword : ""}
            sort=""
          />
        </div>
      </div>
    </section>
    </>
  );
};

export default MainImportStock;
