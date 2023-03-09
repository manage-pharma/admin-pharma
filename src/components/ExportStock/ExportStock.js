import moment from 'moment/moment';
import DataTable from "react-data-table-component";
import { Link, useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from "react-redux";
import { listExportStock, statusExportStock } from "../../Redux/Actions/ExportStockAction";
import { EXPORT_STOCK_STATUS_RESET } from "../../Redux/Constants/ExportStockConstant";
import CustomLoader from './../../util/LoadingTable';
import printReport from './PrintReport';
const ExportStock = (props) =>{
    const {exportStock, loading, loadingStatus} = props 
    const history = useHistory()
    const dispatch = useDispatch()
    const [modalShow, setModalShow] = useState(false);
    const [reportShow, setReportShow] = useState(false);
    const [dataModal, setDataModal] = useState();
    const updateStatus = useSelector(state => state.exportStockStatus)
    const {success} = updateStatus
  
    const MyVerticallyCenteredModal = (props) =>{
        return (
          <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="my-modal-warning"
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter" style={{color: 'black'}}>
                Cập nhật trạng thái 
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Bạn chắc chắn muốn cập nhật trang thái: <span className="text-warning">{dataModal?.exportCode}</span> ?</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="warning" style={{fontWeight:"600"}} onClick={()=>{
                dispatch(statusExportStock(dataModal?._id))
                setModalShow(false)
              }}>OK</Button>
            </Modal.Footer>
          </Modal>
        );
    }

    const CustomMaterialMenu = (props) =>{
        let {row} = props
        return (
            <div className="dropdown">
                <Link
                    to="#"
                    data-bs-toggle="dropdown"
                    className="btn btn-light"
                >
                    <i className="fas fa-ellipsis-h"></i>
                </Link>
                <div className="dropdown-menu">
                  { row.status === false ?
                      <>
                        <button className="dropdown-item active-menu" onClick={(e)=>{
                          e.stopPropagation()
                          setModalShow(true)
                          setDataModal(row)
                        }}>
                          <i className="fas fa-clipboard-check"></i>
                          <span> Xác nhận xuất</span>
                        </button>
                        <button className="dropdown-item active-menu" onClick={(e)=>{
                          e.preventDefault()
                          history.push(`/export-stock/${row._id}`)
                        }}>
                          <i className="fas fa-pencil"></i>
                          <span> Chỉnh sửa</span>
                        </button>
                      </>
                       :
                       <button className="dropdown-item active-menu" onClick={(e)=>{
                        e.preventDefault()
                        history.push(`/export-stock/${row._id}`)
                      }}>
                         <i className="fas fa-eye"></i>
                        <span> Chi tiết</span>
                      </button>
                  }
                  <button className="dropdown-item active-menu" onClick={(e)=>{
                      e.preventDefault()
                      setReportShow(true)
                      setDataModal(row)
                    }}>
                      <i className="fas fa-print"></i>
                      <span> In phiếu xuất</span>
                  </button>
                </div>
            </div>
        )
    }
      
    const columns = [
        {
            name: "STT",
            selector: (row, index) => <bold>{index+1}</bold>,
            reorder: true,
            width: '60px'

        },
        {
            name: "Mã phiếu xuất",
            selector: (row) => row.exportCode,
            sortable: true,
            reorder: true,
            grow: 3
        },
        {
            name: "Khách hàng",
            selector: (row) => row.customer,
            sortable: true,
            reorder: true,
            grow: 2
        },
        {
            name: "Điện thoại",
            selector: (row) => row.phone,
            sortable: true,
            reorder: true,
            grow: 2
        },
        {
            name: "Người lập",
            selector: (row) => row.user.name,
            sortable: true,
            reorder: true,
            grow: 2
        },
        {
            name: "Ngày xuất",
            selector: (row) => moment(row.exportedAt).format("DD/MM/YYYY"),
            sortable: true,
            reorder: true,
            grow: 2
        },
        // {
        //     name: "TOTAL PRICE",
        //     selector: (row) => row.totalPrice,
        //     sortable: true,
        //     reorder: true,
        //     grow: 2
        // },
        {
            name: "Trạng thái",
            selector: (rows) => rows.status === true ? 
                (<span className="badge bg-success text-white">Đã hoàn tất</span>) : 
                (<span className="badge bg-danger text-white">Chưa duyệt</span>),
            sortable: true,
            reorder: true,
            sortFunction: (exportStock) => {
                return [exportStock].map((a, b) => {
                  const fieldA = a.status;
                  const fieldB = b.status;
                  let comparison = 0;
              
                  if (fieldA === fieldB) {
                    comparison = 0;
                  } else if (fieldA === true) {
                    comparison = 1;
                  } else {
                    comparison = -1;
                  }
              
                  return comparison
                });
            },
            grow: 1
        },
        {   name: "Hành động",
            cell: row => <CustomMaterialMenu row={row} />,
            allowOverflow: true,
            button: true,
            width: '100px',
        },
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
        if(success){
          dispatch({ type: EXPORT_STOCK_STATUS_RESET});
          dispatch(listExportStock())
        }
        if(reportShow){
          printReport(dataModal)
          setReportShow(false)
          setDataModal(null)
        }// eslint-disable-next-line
      },[dispatch, success, reportShow])

  return (
    <>
        <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
        />
        <div className='CHtfP'>
          <DataTable
              // theme="solarized"
              columns={columns}
              data={exportStock}
              customStyles={customStyles}
              defaultSortFieldId
              pagination
              // onRowClicked={handleRowClicked}
              paginationComponentOptions={paginationComponentOptions}
              progressPending={loading||loadingStatus}
              progressComponent={<CustomLoader />}
              highlightOnHover
              pointerOnHover
          />
        </div>

    </>

  )  
}
export default ExportStock;