import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { listExportStock, statusExportStock } from "../../Redux/Actions/ExportStockAction";
import moment from "moment";
import { EXPORT_STOCK_STATUS_RESET } from "../../Redux/Constants/ExportStockConstant";
const ExportStock = (props) => {
  const history = useHistory()
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
          <p>Are you sure want to set status <span className="text-warning">{exportStock.exportCode}</span> ?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" style={{fontWeight:"600"}} onClick={()=>{
            dispatch(statusExportStock(exportStock._id))
            setModalShow(false)
          }}>OK</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  const { exportStock, indexSTT } = props;
  const dispatch = useDispatch()
  const [modalShow, setModalShow] = useState(false);

  const updateStatus = useSelector(state => state.exportStockStatus)
  const {success} = updateStatus

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
      <tr key={indexSTT}>
        <th scope="row">{ indexSTT + 1 }</th>
        <td>{ exportStock.exportCode }</td>
        <td>{ exportStock.customer }</td>
        <td>{ exportStock.phone}</td>
        <td>{ exportStock.address}</td>
        <td>{ exportStock.user.name }</td>
        <td>{ moment(exportStock.exportedAt).format("DD/MM/YYYY")}</td>
        <td>{ exportStock.totalPrice}</td>
        { exportStock.status === true ? 
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
                  { exportStock.status === false ?
                      <>
                        <button className="dropdown-item bg-warning" onClick={(e)=>{
                          e.stopPropagation()
                          setModalShow(true)
                        }}>
                          <span className="text-black">Confirm export</span>
                        </button>
                        <button className="dropdown-item" onClick={(e)=>{
                          e.preventDefault()
                          history.push(`/export-stock/${exportStock._id}`)
                        }}>Edit info</button>
                      </>
                       :
                       <button className="dropdown-item" onClick={(e)=>{
                        e.preventDefault()
                        history.push(`/export-stock/${exportStock._id}`)
                      }}>Detail info</button>
                  }
                </div>
              </div>
          </td>
      </tr> 
    </>
  );
};

export default ExportStock;
