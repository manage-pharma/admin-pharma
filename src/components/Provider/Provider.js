import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from "react-redux";
import { PROVIDER_DELETE_RESET } from "../../Redux/Constants/ProviderConstants";
import { deleteProvider, listProvider, singleProvider } from "../../Redux/Actions/ProviderAction";
import CustomLoader from './../../util/LoadingTable';

const Provider = (props) =>{
    const { provider, setShow, loading, loadingDelete } = props;
    const dispatch = useDispatch()
    const [modalShow, setModalShow] = useState(false);
    const [dataModal, setDataModal] = useState();
    const providerDeleted = useSelector(state => state.providerDelete)
    const {success: successDelete} = providerDeleted

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
              dispatch(deleteProvider(dataModal?._id))
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
                    dispatch(singleProvider(row._id))
                    setShow(true)
                    setDataModal(row)
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
            grow: 3
        },
        {
            name: "CONTACT PERSON",
            selector: (row) => row.contactName,
            sortable: true,
            reorder: true,
            grow: 2
        },
        {
            name: "TAXCODE",
            selector: (row) => row.taxCode,
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
            name: "EMAIL",
            selector: (row) => row.email,
            sortable: true,
            reorder: true,
            grow: 2
        },
        {
            name: "ADDRESS",
            selector: (row) => row.address,
            sortable: true,
            reorder: true,
            grow: 2
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
      if(successDelete){
        dispatch({ type: PROVIDER_DELETE_RESET});
        dispatch(listProvider())
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
            data={provider}
            customStyles={customStyles}
            defaultSortFieldId
            pagination
            // onRowClicked={handleRowClicked}
            paginationComponentOptions={paginationComponentOptions}
            progressPending={loading||loadingDelete}
			      progressComponent={<CustomLoader />}
            highlightOnHover
            pointerOnHover
        />
    </>

  )  
}
export default Provider;