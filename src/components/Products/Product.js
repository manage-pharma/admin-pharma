import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { deleteProduct, listProduct } from "../../Redux/Actions/ProductActions";
import { useSelector } from "react-redux";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { PRODUCT_DELETE_RESET } from "../../Redux/Constants/ProductConstants";
import moment from "moment/moment";
const Product = (props) => {
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
          <p>Are you sure you want to delete <span className="text-danger">{product.name}</span> ?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-danger" onClick={()=>{
            dispatch(deleteProduct(product._id))
          }}>OK</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  const { product, indexSTT } = props;
  const dispatch = useDispatch()
  const history = useHistory()
  const [modalShow, setModalShow] = useState(false);
  const handleDelete = (e) =>{
    setModalShow(true)
  }
  const productDelete = useSelector(state => state.productDelete)
  const { loading: loadingDelete, error: errorDelete, success: successDelete} = productDelete

  useEffect(()=>{
    if(successDelete){
      dispatch({ type: PRODUCT_DELETE_RESET});
      dispatch(listProduct())
    }
  },[dispatch, successDelete])
 
  // const handleDelete = (id) =>{
  //   if(window.confirm("Are you sure ??")){
  //     dispatch(deleteProduct(id))
  //   }
  // } 

  return (
    <>
      { errorDelete && (<Message variant="alert-danger">{errorDelete}</Message>) }
      { loadingDelete ? (<Loading/>) : (
        <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        />
      )}
      <tr key={indexSTT}>
        <th scope="row">{ indexSTT + 1 }</th>
        <td>{ product.name }</td>
        <td>
            <img style={{width:"60px", height:"40px"}} src={product.image} alt="ImageProduct" />
        </td>
        <td><span className="badge bg-warning text-dark">{ product?.category?.name }</span></td>
        <td><span className="badge bg-primary text-white">{ product?.categoryDrug?.name }</span></td>
        {/* <td>{ product.unit}</td>
        <td>{ product.capacity}</td>
        <td>{ moment(product.expDrug).format('DD-MM-YYYY')}</td> */}
        <td>{`${moment(product.expDrug).diff(moment(Date.now()), "days")} days`}</td>
        <td>{ product.price}</td>
        <td>{ product.countInStock }</td>
        {/* <td>{ product.description}</td> */}
        { product.statusDrug === true ? 
            <td><span className="badge bg-success text-white">Using</span></td>   : 
            <td><span className="badge bg-danger text-white">Stopped</span></td>
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
                  <button className="dropdown-item" onClick={(e)=>{
                    e.stopPropagation()
                    history.push(`/product/${product._id}`)
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

export default Product;
