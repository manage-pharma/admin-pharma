import React, { useEffect, useState } from "react";
import CreateCategoryDrug from "./CreateCategoryDrug";
import CategoriesDrugTable from "./CategoriesDrugTable";
import { useDispatch, useSelector } from 'react-redux';
import { CATEGORY_DRUG_CREATE_RESET, CATEGORY_DRUG_DELETE_RESET, CATEGORY_DRUG_UPDATE_RESET } from "../../Redux/Constants/CategoryDrugConstants";
import Toast from "../LoadingError/Toast";
import { deleteCategoryDrug, listCategoryDrug } from "../../Redux/Actions/CategoryDrugAction";
import { toast } from "react-toastify";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const MainCategoriesDrug = () => {
  const dispatch = useDispatch();
  const MyVerticallyCenteredModal = (props) =>{
    const {data} = props
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
          <p>Are you sure you want to delete <span className="text-danger">{data.name}</span> ?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-danger" onClick={(e)=>{
            e.preventDefault()
            dispatch(deleteCategoryDrug(data._id))
            setModalShow(false)
          }}>OK</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const [modalShow, setModalShow] = useState(false);
  const [createCallback, setCreateCallback] = useState('');
  const [editCallback, setEditcallback] = useState('');
  const [updateCallback, setUpdatecallback] = useState('');
  const [deleteCallback, setDeletecallback] = useState('');

  const CreateCallbackFunction = (childData) =>{
    setCreateCallback(childData)
  }
  const editCallbackFunction = (childData) =>{
    setEditcallback(childData)
  }
  const updateCallbackFunction = (childData) =>{
    setUpdatecallback(childData)
  }
  const deleteCallbackFunction = (childData) =>{
    setDeletecallback(childData)
  }
  const categoryDrugList = useSelector((state)=> state.categoryDrugList)
  const deleteCategorySelector = useSelector(state => state.categoryDrugDelete)
  const { loading: loadingDelete, error: errorDelete, success: successDelete} = deleteCategorySelector
  useEffect(()=>{
    if(createCallback){
      toast.success("Category Drug Added", ToastObjects);
      dispatch({ type: CATEGORY_DRUG_CREATE_RESET })
      setCreateCallback(null)
    }
    if(updateCallback){
      toast.success("Category Drug Updated", ToastObjects);
      dispatch({ type: CATEGORY_DRUG_UPDATE_RESET })
      setUpdatecallback(null)
      setEditcallback("")
    }
    if(successDelete){
      toast.success("Category Drug Deleted", ToastObjects);
      dispatch({ type: CATEGORY_DRUG_DELETE_RESET })
      setDeletecallback("")
      setUpdatecallback(null)
      setEditcallback("")
    }
    dispatch(listCategoryDrug());
  },[dispatch, createCallback, updateCallback, successDelete])

  return (
    <>
      { errorDelete && (<Message variant="alert-danger">{errorDelete}</Message>) }
      { loadingDelete ? (<Loading/>) : (
        <MyVerticallyCenteredModal
        show={modalShow}
        data={deleteCallback}
        onHide={() => setModalShow(false)}
        />
      )}
      <Toast />
      <section className="content-main">
        <div className="content-header">
          <h2 className="content-title">Categories</h2>
          <div>{ editCallback ? (
            <button onClick={(e)=>{
              e.preventDefault()
              setEditcallback('')
            }}className="btn btn-primary">
              Create new
            </button>
           ) : ""}
          </div>
        </div>

        <div className="card shadow-sm">
          <div className="card-body">
            <div className="row">
              {/* Create category */}
              <CreateCategoryDrug parentCallbackCreate={CreateCallbackFunction} parentCallbackUpdate={updateCallbackFunction} valueEdit={editCallback}/>
              {/* Categories table */}
              <CategoriesDrugTable categoryDrugList={categoryDrugList} parentCallbackEdit={editCallbackFunction} parentCallbackDelete={deleteCallbackFunction} parentModal={setModalShow}/>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MainCategoriesDrug;
