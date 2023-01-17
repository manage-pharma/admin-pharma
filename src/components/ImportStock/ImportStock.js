import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { listImportStock, statusImportStock } from "../../Redux/Actions/ImportStockAction";
import { toast } from "react-toastify";
import moment from "moment";
import { IMPORT_STOCK_STATUS_RESET } from "../../Redux/Constants/ImportStockConstant";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const ImportStock = (props) => {
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
          <p>Are you sure want to set status <span className="text-warning">{importStock.importCode}</span> ?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" style={{fontWeight:"600"}} onClick={()=>{
            dispatch(statusImportStock(importStock._id))
            toast.success(`Update status successfully`, ToastObjects);
          }}>OK</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  const { importStock, indexSTT } = props;
  const dispatch = useDispatch()
  const [modalShow, setModalShow] = useState(false);

  const updateStatus = useSelector(state => state.importStockStatus)
  const { loading, error, success} = updateStatus

  useEffect(()=>{
    if(success){
      toast.success(`Update status successfully`, ToastObjects);
      setModalShow(false)
      dispatch({ type: IMPORT_STOCK_STATUS_RESET});
      dispatch(listImportStock())
    }
  },[dispatch, success])
 

  return (
    <>
      { error && (<Message variant="alert-danger">{error}</Message>) }
      { loading ? (<><Loading/></>) : (
        <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        />
      )}
      <tr key={indexSTT}>
        <th scope="row">{ indexSTT + 1 }</th>
        <td>{ importStock.importCode }</td>
        <td>{ importStock.provider.name}</td>
        <td>{ importStock.user.name }</td>
        <td>{ moment(importStock.importedAt).format("DD/MM/YYYY")}</td>
        <td>{ importStock.totalPrice}</td>
        { importStock.status === true ? 
          <td><span className="badge bg-success text-white">Completed</span></td>   : 
          <td><span className="badge bg-danger text-white">Incomplete</span></td>
        }
        <td className="">
              <div 
                onClick={e=>{}} 
                className="dropdown">
                <Link
                  to="#"
                  data-bs-toggle="dropdown"
                  className="btn btn-light"
                >
                  <i className="fas fa-ellipsis-h"></i>
                </Link>
                <div className="dropdown-menu">
                  { importStock.status === false ?
                      <button className="dropdown-item bg-warning" onClick={(e)=>{
                        e.stopPropagation()
                        setModalShow(true)
                      }}>
                        <span className="text-black">Confirm import</span>
                      </button> :
                      ''
                  }
                  <button className="dropdown-item ">Edit info</button>
                </div>
              </div>
          </td>
      </tr> 
    </>
  );
};

export default ImportStock;
