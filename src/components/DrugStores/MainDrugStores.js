import React,{useState,useEffect,useRef} from "react";
import {useDispatch,useSelector} from "react-redux";
import {Link,useHistory} from "react-router-dom";
import Message from '../LoadingError/Error';
import debounce from "lodash.debounce";
import Toast from '../LoadingError/Toast';
import DataTableProduct from "./DataTable";
import {listDrugStore} from "../../Redux/Actions/DrugStoreActions";

const MainDrugStore =() => {

  const dispatch=useDispatch()
  const history=useHistory()
  const [keyword,setSearch]=useState()
  const [sort, setSort]=useState()

  const drugstoreList=useSelector((state) => state.drugstoreList)
  const {loading, error, drugstores}=drugstoreList

  const handleSelected = (e) => {
    e.preventDefault();
    let sortPrice = e.target.value
    dispatch(listDrugStore(keyword, sortPrice))
    setSort(e.target.value)
  }
  const callApiKeywordSearch = (keyword, sort) => {
    if(keyword.trim() !== '') {
      dispatch(listDrugStore(keyword, sort))
    }
    else {
      history.push('/drugstore');
    }
  }
  const debounceDropDown = useRef(debounce((keyword, sort) => callApiKeywordSearch(keyword, sort),300)).current;

  const handleSubmitSearch = e => {
    setSearch(e.target.value)
    debounceDropDown(e.target.value, sort);
  }

  useEffect(() => {
    if(keyword){
      dispatch(listDrugStore(keyword))
    }
    // eslint-disable-next-line
  },[dispatch, keyword])

  return (
    <>
      <Toast />
      {
        error ? (<Message>{error}</Message>) : ''
      }
      <section className="content-main">
        <div className="content-header">
          <h3 className="content-title">Danh sách dược phẩm</h3>
          <div className="d-flex">
            <div style={{marginRight: '10px'}}>
              <Link to="/product/excel" className="btn btn-primary">
                Excel & CSV
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
                  placeholder="Tìm kiếm thuốc..."
                  className="form-control p-2"
                  value={keyword}
                  onChange={handleSubmitSearch}
                />
              </div>
              <div className="col-lg-2 col-6 col-md-3">
                <select defaultValue="" className="form-select" onChange={handleSelected}>
                  <option value="">---Chọn giá--</option>
                  <option value="cheap">(1$ - 100$)</option>
                  <option value="expensive">(101$ - 1000$)</option>
                </select>
              </div>
            </div>
          </header>

          <div>
            <DataTableProduct
              drugstores={drugstores}
              loading={loading}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default MainDrugStore;
