import moment from 'moment/moment';
import DataTable from "react-data-table-component";
import { Link, useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useDispatch } from "react-redux";
import { deleteProduct, listProduct } from "../../Redux/Actions/ProductActions";
import { useSelector } from "react-redux";
import { PRODUCT_DELETE_RESET } from "../../Redux/Constants/ProductConstants";
import CustomLoader from './../../util/LoadingTable';
const DataTableProduct = (props) =>{
    const {products, dessert, loading, loadingDelete} = props 
    const history = useHistory()
    const dispatch = useDispatch()
    const [modalShow, setModalShow] = useState(false);
    const [dataModal, setDataModal] = useState();
    const productDelete = useSelector(state => state.productDelete)
    const { success: successDelete} = productDelete

    const MyVerticallyCenteredModal = (props) =>{
        return (
            <Modal
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="my-modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    Delete 
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete <span className="text-danger">{dataModal?.name}</span> ?</p>
                </Modal.Body> 
                <Modal.Footer>
                    <Button className="btn-danger" onClick={()=>{
                    dispatch(deleteProduct(dataModal?._id))
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
                    <button className="dropdown-item" onClick={(e)=>{
                        e.stopPropagation()
                        let id = row._id
                        history.push(`/product/${id}`)
                    }}>
                        Edit info
                    </button>
                    <button className="dropdown-item text-danger" onClick={(e)=>{
                        e.preventDefault()
                        setModalShow(true)
                        setDataModal(row)
                    }}>
                        Delete
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
            name: "NAME",
            selector: (row) => row.name,
            sortable: true,
            reorder: true,
            minWidth: "180px",
        },
        // {
        //     name: "IMAGE",
        //     selector: (row) => <img className="mt-1 w-50 h-50" src={row.image} alt="ImageCategory" />,
        // },
        {
            name: "CATEGORY",
            selector: (row) => row.category.name,
            sortable: true,
            minWidth: "180px",
        },
        {
            name: "CATEGORY DRUG",
            selector: (row) => row.categoryDrug.name,
            sortable: true,
            minWidth: "180px",
        },
        {
            name: "STOCK",
            selector: (row) => row.countInStock,
            sortable: true,
            reorder: true
        },
        {
            name: "UNIT",
            selector: (row) => row.unit,
            sortable: true,
            reorder: true
        },
        {
            name: "CAPACITY",
            selector: (row) => row.capacity,
            sortable: true,
            reorder: true
        },
        {
            name: "EXP",
            selector: (row) => moment(row.expDrug).format("DD-MM-YYYY"),
            sortable: true,
            reorder: true
        },
        {
            name: "REST EXP",
            selector: (row) => (moment(row.expDrug)).diff(moment(Date.now()), "days"),
            sortable: true,
            reorder: true
        },
        {
            name: "STATUS",
            selector: (row) => row.statusDrug === true ? 
                <span className="badge bg-success text-white">Using</span> :
                <span className="badge bg-danger text-white">Stopped</span>,
            sortable: true,
            sortFunction: (products) => {
                return [products].map((a, b) => {
                  const fieldA = a.statusDrug;
                  const fieldB = b.statusDrug;
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
            reorder: true
        },
        {
            name: "ACTION",
            cell: row => <CustomMaterialMenu size="small" row={row} />,
            allowOverflow: true,
            button: true,
            width: '100px',
        },
    ];

    const paginationComponentOptions = {
        selectAllRowsItem: true,
        selectAllRowsItemText: "ALL"
    };

    const conditionalRowStyles = [
        {
            when: row => (moment(row.expDrug)).diff(moment(Date.now()), "days") > 180,
            style: {
                backgroundColor: 'rgba(63, 195, 128, 0.9)',
                color: 'white',
                '&:hover': {
                    cursor: 'pointer',
                },
            },
        },
        {
            when: row => (moment(row.expDrug)).diff(moment(Date.now()), "days") >= 90 && (moment(row.expDrug)).diff(moment(Date.now()), "days") < 180,
            style: {
                backgroundColor: 'rgba(248, 148, 6, 0.9)',
                color: 'white',
                '&:hover': {
                    cursor: 'pointer',
                },
            },
        },
        {
            when: row => (moment(row.expDrug)).diff(moment(Date.now()), "days") < 90,
            style: {
                backgroundColor: 'rgba(242, 38, 19, 0.9)',
                color: 'white',
                '&:hover': {
                    cursor: 'not-allowed',
                },
            },
        },
    ];

    // const handleRowClicked = (row) => {
    // history.push(`/product/${row._id}`)
    // };

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
      if(successDelete){
        dispatch({ type: PRODUCT_DELETE_RESET});
        dispatch(listProduct())
      }
    },[dispatch, successDelete])
  return (
    <>
        <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
        />
        <DataTable
            // theme="solarized"
            columns={columns}
            data={products}
            customStyles={customStyles}
            defaultSortFieldId
            pagination
            // onRowClicked={handleRowClicked}
            conditionalRowStyles={dessert ? conditionalRowStyles: ''}
            paginationComponentOptions={paginationComponentOptions}
            progressPending={loading||loadingDelete}
			progressComponent={<CustomLoader />}
            highlightOnHover
            pointerOnHover
        />
    </>

  )  
}
export default DataTableProduct;