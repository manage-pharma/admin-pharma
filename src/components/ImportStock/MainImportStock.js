import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Loading from '../LoadingError/Loading';
import Message from '../LoadingError/Error';
import Pagination from "../LoadingError/Pagination";
import debounce from "lodash.debounce";
import ImportStock from "./ImportStock";
import { listImportStock } from "../../Redux/Actions/ImportStockAction";
import Toast from './../LoadingError/Toast';
import { toast } from "react-toastify";
import renderToast from "../../util/Toast";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const MainImportStock = (props) => {
  const { pageNumber } = props
  const dispatch = useDispatch()
  const history = useHistory()
  const [ isStop , setIsStop ] = useState(false)
  const [keyword, setSearch] = useState()
  const [toggleSearch, setToggleSearch] = useState(false)
  const [data, setData] = useState({
    from: '',
    to: ''
  })
  const {from,to} = data

  const importedStockList = useSelector((state)=> state.importStockList)
  const { loading, error, stockImported, currentPage, totalPage } = importedStockList

  const callApiKeywordSearch = (keyword, pageNumber, from, to) =>{
      dispatch(listImportStock(keyword, pageNumber, from, to))
  }
  const debounceDropDown = useRef(debounce((keyword, pageNumber, from, to) => callApiKeywordSearch(keyword, pageNumber, from, to) , 300)).current;

  const handleSubmitSearch = e =>{
    e.preventDefault()
    setSearch(e.target.value)
    debounceDropDown(e.target.value, pageNumber, data.from, data.to);
  }

  const handleAdd = (e) =>{
    e.preventDefault();
    history.push('/import-stock/add');
  }

  const handleChange = e =>{
    e.preventDefault();
    setData(prev => {
      return {
        ...prev, [e.target.name]: e.target.value
      }
    })
  }
  const handleSearchDate = (e) =>{
    e.preventDefault();
    if(!toggleSearch){
      if(!data.from || !data.to){
        if(!isStop){
          renderToast('Date has not been selected','error', setIsStop, isStop)
        }
        return;
      }
      dispatch(listImportStock(keyword, pageNumber, data.from, data.to))
      setToggleSearch(!toggleSearch)  
    }
    else{
      setData({
        from: '',
        to: ''
      })
      dispatch(listImportStock(keyword, pageNumber))
      setToggleSearch(!toggleSearch)  
    }
  }
  const updateStatus = useSelector(state => state.importStockStatus)
  const {success} = updateStatus
  useEffect(()=>{
    if(success){
      toast.success(`Update status successfully`, ToastObjects)
    }
    dispatch(listImportStock(keyword, pageNumber)) // eslint-disable-next-line
  },[dispatch, pageNumber, success])

  return (
    <>
    <Toast/>
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
              <div className="d-flex">
                <span className="label-date">From: </span>
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
                <span className="label-date">To: </span>
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
                <button className="btn btn-danger" onClick={handleSearchDate}>Cancel</button>
              : 
                <button className="btn btn-success" onClick={handleSearchDate}>Search</button>
              }
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
                            <th scope="col">Created by</th>
                            <th scope="col">Imported at</th>
                            <th scope="col">Total price</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                          <tbody>
                             {stockImported ? stockImported.map((listImport, index)=>(
                              <ImportStock 
                                importStock={listImport} 
                                indexSTT={index} 
                                key={index}
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
