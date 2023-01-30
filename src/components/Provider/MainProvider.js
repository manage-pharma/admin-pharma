import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Loading from '../LoadingError/Loading';
import Message from '../LoadingError/Error';
import Pagination from "../LoadingError/Pagination";
import debounce from "lodash.debounce";
import { listProvider } from './../../Redux/Actions/ProviderAction';
import Provider from "./Provider";
import AddProvider from "./AddProviderModal";
import Toast from './../LoadingError/Toast';
import { toast } from "react-toastify";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const MainProvider = (props) => {
  const { pageNumber } = props
  const dispatch = useDispatch()
  const history = useHistory()
  const [show, setShow] = useState(false);
  const [keyword, setSearch] = useState()
  
  const providerList = useSelector((state)=> state.providerList)
  const { loading, error, providers, currentPage, totalPage } = providerList

  const providerDeleted = useSelector(state => state.providerDelete)
  const { loading: loadingDelete, error: errorDelete, success: successDelete} = providerDeleted

  const callApiKeywordSearch = (keyword, pageNumber) =>{
    if( keyword.trim() !== ''){
      dispatch(listProvider(keyword, pageNumber))
    }
    else{
      history.push('/providers');
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

  const handlePaginate = (keywordProp, currentPageProp, sortProp) =>{
    dispatch(listProvider(keywordProp, currentPageProp, sortProp))
  }

  useEffect(()=>{
    if(successDelete){
      toast.success("Deleted successfully", ToastObjects);
    }
    else{
      dispatch(listProvider(keyword, pageNumber))
    } // eslint-disable-next-line
  },[dispatch, successDelete, pageNumber])

  return (
    <>
    <Toast />
    { loading || loadingDelete? (<Loading/>) : error || errorDelete ? (<Message variant="alert-danger">{error ||  errorDelete}</Message>) : ''}
    <AddProvider show={show} setShow={setShow}/>
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">PROVIDER LIST</h2>
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
          <div className="row">
              <div className="card card-custom mb-4 shadow-sm">
                <header className="card-header bg-white ">
                  <div className="row gx-3 py-3">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">STT</th>
                          <th scope="col">Name</th>
                          <th scope='col'>Contact person</th>
                          <th scope="col">Tax code</th>
                          <th scope="col">Phone</th>
                          <th scope="col">Email</th>
                          <th scope="col">Address</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                        <tbody>
                            {providers ? providers.map((provider, index)=>(
                            <Provider 
                              provider={provider} 
                              key={index} 
                              indexSTT={index} 
                              show={show} 
                              setShow={setShow}
                              />)) : 
                            <div>There are no record</div>
                        }
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
            sort= ""
            handlePage={handlePaginate}
          />
        </div>
      </div>
    </section>
    </>
  );
};

export default MainProvider;
