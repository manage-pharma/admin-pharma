import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct, listProduct } from "../../Redux/Actions/ProductActions";
import { useSelector } from "react-redux";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { PRODUCT_DELETE_RESET } from "../../Redux/Constants/ProductConstants";
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
  const { product } = props;
  const dispatch = useDispatch()
  const [modalShow, setModalShow] = useState(false);
  const handleDelete = (e) =>{
    e.preventDefault()
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
      <div className="col-md-6 col-sm-6 col-lg-3 mb-5">
        <div className="card card-product-grid shadow-sm">
          <Link to="#" className="img-wrap">
            <img src={product.image} alt="Product" />
          </Link>
          <div className="info-wrap">
            <Link to="#" className="title text-truncate">
              {product.name}
            </Link>
            <div className="price mb-2">${product.price}</div>
            <div className="row">
              <Link
                to={`/product/${product._id}/edit`}
                className="btn btn-sm btn-outline-success p-2 pb-3 col-md-6"
              >
                <i className="fas fa-pen"></i>
              </Link>
              <Link
                to="#"
                onClick={handleDelete}
                className="btn btn-sm btn-outline-danger p-2 pb-3 col-md-6"
              >
                <i className="fas fa-trash-alt"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
