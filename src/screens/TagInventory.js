import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./../components/Sidebar";
import Header from "./../components/Header";
import debounce from "lodash.debounce";
import Message from "../components/LoadingError/Error";
import renderToast from "../util/Toast";
import { listImportStock } from "../Redux/Actions/ImportStockAction";
import Toast from "../components/LoadingError/Toast";
import CustomLoader from "../util/LoadingTable";
import DataTable from "react-data-table-component";
const TagInventory = (props) => {
  const dispatch = useDispatch()
  const [ isStop , setIsStop ] = useState(false)
  const [keyword, setSearch] = useState()
  const [toggleSearch, setToggleSearch] = useState(false)
  const [data, setData] = useState({
    from: '',
    to: ''
  })
  const {from,to} = data
  
  const importedStockList = useSelector(state=> state.importStockList)
  const { loading, error, stockImported } = importedStockList

  const callApiKeywordSearch = (keyword, from, to) =>{
      dispatch(listImportStock(keyword, from, to))
  }
  const debounceDropDown = useRef(debounce((keyword, from, to) => callApiKeywordSearch(keyword, from, to) , 300)).current;

  const handleSubmitSearch = e =>{
    e.preventDefault()
    setSearch(e.target.value)
    debounceDropDown(e.target.value, data.from, data.to);
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
      dispatch(listImportStock(keyword, data.from, data.to)) 
    }
    else{
      setData({
        from: '',
        to: ''
      })
      dispatch(listImportStock(keyword)) 
    }
    setToggleSearch(!toggleSearch)
  }

  const columns = [
    {
        name: "STT",
        selector: (row, index) => <bold>{index+1}</bold>,
        reorder: true,
        width: '60px'

    },
    {
        name: "Số lô",
        selector: (row) => row.importCode,
        sortable: true,
        reorder: true,
        grow: 3
    },
    {
        name: "Tồn đầu kỳ",
        selector: (row) => row.provider.name,
        sortable: true,
        reorder: true,
        grow: 2
    },
    {
        name: "Nhập",
        selector: (row) => row.user.name,
        sortable: true,
        reorder: true,
        grow: 2
    },
    {
        name: "Xuất",
        selector: (row) => row.user.name,
        sortable: true,
        reorder: true,
        grow: 2
    },
    {
        name: "Tồn cuối kỳ",
        selector: (row) => row.totalPrice,
        sortable: true,
        reorder: true,
        grow: 2
    }
];

const paginationComponentOptions = {
    selectAllRowsItem: true,
    selectAllRowsItemText: "ALL"
};

const customStyles = {
    rows: {
        highlightOnHoverStyle: {
        backgroundColor: 'rgb(230, 244, 244)',
        borderBottomColor: '#FFFFFF',
        // borderRadius: '25px',
        outline: '1px solid #FFFFFF',
        },
    },
    header: {
        style: {
            minHeight: '56px',
        },
    },
    headRow: {
        style: {
            fontSize: '14px',
            borderTopStyle: 'solid',
            borderTopWidth: '1px',
            borderTopColor:'grey',
        },
    },
    headCells: {
        style: {
        '&:not(:last-of-type)': {
            borderRightStyle: 'solid',
            borderRightWidth: '1px',
            borderRightColor: 'grey',
        },
        },
    },
    cells: {
        style: {
        '&:not(:last-of-type)': {
            borderRightStyle: 'solid',
            borderRightWidth: '1px',
            borderRightColor: 'grey',
        },
        },
    },
};



  useEffect(()=>{
      dispatch(listImportStock(keyword)) 
     // eslint-disable-next-line
  },[dispatch])

  return (
    <>
    <Sidebar />
    <main className="main-wrap">
      <Header />
      <Toast/>
      { error ? (<Message variant="alert-danger">{error}</Message>) : ''}

      <section className="content-main">
        <div className="content-header">
          <h2 className="content-title">Thẻ kho</h2>
        </div>

        <div className="card card-custom mb-4 shadow-sm">
          <header className="card-header bg-white ">
            <div className="row gx-3 py-3">
              <div className="col-lg-4 col-md-6 me-auto ">
                <input
                  type="search"
                  placeholder="Tìm kiếm đơn nhập kho..."
                  className="form-control p-2"
                  value={keyword}
                  onChange={handleSubmitSearch}
                />
              </div>
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
                  <span className="label-date">đến: </span>
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
                  <button className="btn btn-danger" onClick={handleSearchDate}>Hủy tìm kiếm</button>
                : 
                  <button className="btn btn-success" onClick={handleSearchDate}>Tìm kiếm</button>
                }
              </div>
            </div>
          </header>

          <div>
            {stockImported ?
              (
                  <DataTable
                      // theme="solarized"
                      columns={columns}
                      data={stockImported}
                      customStyles={customStyles}
                      defaultSortFieldId
                      pagination
                      // onRowClicked={handleRowClicked}
                      paginationComponentOptions={paginationComponentOptions}
                      progressPending={loading}
                      progressComponent={<CustomLoader />}
                      highlightOnHover
                      pointerOnHover
                  />
              ) : 
              <div>Không có dữ liệu</div>
            }
          </div>
        </div>
      </section>
    </main>
    </>
  );
};

export default TagInventory;
