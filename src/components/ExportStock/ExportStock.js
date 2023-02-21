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

const ExportStock = (props) =>{
    const {exportStock, loading, loadingStatus} = props 
    const history = useHistory()
    const dispatch = useDispatch()
    const [modalShow, setModalShow] = useState(false);
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
                Update status 
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Are you sure want to set status <span className="text-warning">{dataModal?.exportCode}</span> ?</p>
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
                        <button className="dropdown-item bg-warning" onClick={(e)=>{
                          e.stopPropagation()
                          setModalShow(true)
                          setDataModal(row)
                        }}>
                          <span className="text-black">Confirm export</span>
                        </button>
                        <button className="dropdown-item" onClick={(e)=>{
                          e.preventDefault()
                          history.push(`/export-stock/${row._id}`)
                        }}>Edit info</button>
                      </>
                       :
                       <button className="dropdown-item" onClick={(e)=>{
                        e.preventDefault()
                        history.push(`/export-stock/${row._id}`)
                      }}>Detail info</button>
                  }
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
            name: "EXPORT CODE",
            selector: (row) => row.exportCode,
            sortable: true,
            reorder: true,
            grow: 3
        },
        {
            name: "CUSTOMER",
            selector: (row) => row.customer,
            sortable: true,
            reorder: true,
            grow: 2
        },
        {
            name: "PHONE",
            selector: (row) => row.phone,
            sortable: true,
            reorder: true,
            grow: 2
        },
        {
            name: "CREATED BY",
            selector: (row) => row.user.name,
            sortable: true,
            reorder: true,
            grow: 2
        },
        {
            name: "EXPORTED AT",
            selector: (row) => moment(row.exportedAt).format("DD/MM/YYYY"),
            sortable: true,
            reorder: true,
            grow: 2
        },
        {
            name: "TOTAL PRICE",
            selector: (row) => row.totalPrice,
            sortable: true,
            reorder: true,
            grow: 2
        },
        {
            name: "STATUS",
            selector: (rows) => rows.status === true ? 
                (<span className="badge bg-success text-white">Completed</span>) : 
                (<span className="badge bg-danger text-white">Incomplete</span>),
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
        {   name: "ACTION",
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
      },[dispatch, success])

  return (
    <>
        <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
        />
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
    </>

  )  
}
export default ExportStock;