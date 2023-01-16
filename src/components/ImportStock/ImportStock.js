import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { PROVIDER_DELETE_RESET } from "../../Redux/Constants/ProviderConstants";
import { deleteProvider, listProvider, singleProvider } from "../../Redux/Actions/ProviderAction";
import { toast } from "react-toastify";
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
        className="my-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Delete 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete <span className="text-danger">{provider.name}</span> ?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-danger" onClick={()=>{
            dispatch(deleteProvider(provider._id))
            toast.success(`Deleted successfully`, ToastObjects);
          }}>OK</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  const { provider, indexSTT, setShow } = props;
  const dispatch = useDispatch()
  const [modalShow, setModalShow] = useState(false);
  const handleDelete = (e) =>{
    setModalShow(true)
  }
  const providerDeleted = useSelector(state => state.providerDelete)
  const { loading: loadingDelete, error: errorDelete, success: successDelete} = providerDeleted

  useEffect(()=>{
    if(successDelete){
      setModalShow(false)
      dispatch({ type: PROVIDER_DELETE_RESET});
      dispatch(listProvider())
    }
  },[dispatch, successDelete])
 

  return (
    <>
      { errorDelete && (<Message variant="alert-danger">{errorDelete}</Message>) }
      { loadingDelete ? (<><Loading/></>) : (
        <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        />
      )}
      <tr key={indexSTT}>
        <th scope="row">{ indexSTT + 1 }</th>
        <td>{ provider.name }</td>
        <td>{ provider.contactName}</td>
        <td>{ provider.taxCode }</td>
        <td>{ provider.phone}</td>
        <td>{ provider.email}</td>
        <td>{ provider.address}</td>
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
                  <button className="dropdown-item" onClick={(e)=>{
                    e.stopPropagation()
                    dispatch(singleProvider(provider._id))
                    setShow(true)
                  }}>
                    Edit info
                  </button>
                  <button className="dropdown-item text-danger" onClick={handleDelete}>
                    Delete
                  </button>
                </div>
              </div>
          </td>
      </tr> 
    </>
  );
};

export default ImportStock;
