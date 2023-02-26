import React, { useState, useEffect } from "react";
import Toast from "./../LoadingError/Toast";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { singleProduct, updateProduct } from "../../Redux/Actions/ProductActions";
import { toast } from "react-toastify";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { PRODUCT_UPDATE_RESET } from "../../Redux/Constants/ProductConstants";
import axios from "axios";
import { listCategory } from './../../Redux/Actions/CategoryAction';
import { listCategoryDrug } from "../../Redux/Actions/CategoryDrugAction";
import moment from 'moment/moment';
import { listUnit } from './../../Redux/Actions/UnitAction';
import MyVerticallyCenteredModal from "./Modal/ModalUnit";
import { UNIT_CREATE_RESET, UNIT_DELETE_RESET } from "../../Redux/Constants/UnitConstants";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const EditProductMain = (props) => {
  const { productId } = props;
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const [flag, setFlag] = useState(false)
  const [file, setImg] = useState(null) ;
  const [data, setData] = useState({
    name: '',
    price: 0,
    countInStock: 0,
    image: '',
    description: '',
    unit: '',
    regisId: '',
    capacity: '',
    expDrug: Date.now,
    statusDrug: true
  })

  const { name, price, description, image, countInStock, category, categoryDrug, unit, regisId, expDrug, capacity, statusDrug } = data;
  const handleChange = e => {
    setData(prev => {
      return {
        ...prev, [e.target.name]: e.target.value
      }
    })
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    if(file){
    const formData = new FormData();
    formData.append('image', file);
    const { data: dataUp } = await axios.post(`/api/products/single`, formData);
    data.image = dataUp.filename
  }
    dispatch(updateProduct({ ...data, productId }));
  }
  const categoryList = useSelector((state)=> state.categoryList)
  const {categories} = categoryList
  const categoryDrugList = useSelector((state)=> state.categoryDrugList)
  const {categoriesDrug} = categoryDrugList

  const productEdit = useSelector((state) => state.productSingle);
  const { loading, error, product } = productEdit;

  const productUpdate = useSelector((state) => state.productUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;

  const unitList = useSelector(state => state.unitList)
  const {error: errorUnit, units} = unitList

  const unitCreated = useSelector(state => state.unitCreate)
  const {loading: loadingUnitCreate, error: errorUnitCreate, success: successUnitCreate} = unitCreated

  const unitDeleted = useSelector(state => state.unitDelete)
  const {loading: loadingUnitDelete, error: errorUnitDelete, success: successUnitDelete} = unitDeleted

  useEffect(() => {
    dispatch(listUnit())
    dispatch(listCategory())
    dispatch(listCategoryDrug())
    if (successUpdate) {
      dispatch({
        type: PRODUCT_UPDATE_RESET
      });
      dispatch(singleProduct(productId));

      toast.success("Product Updated", ToastObjects);
    }
    if(successUnitCreate){
      toast.success("Unit added", ToastObjects);
      dispatch({ type: UNIT_CREATE_RESET })
    }
    if(successUnitDelete){
      toast.success("Unit deleted", ToastObjects);
      dispatch({ type: UNIT_DELETE_RESET })
    }
    if (product._id !== productId) {
      dispatch(singleProduct(productId));
    }  
    if (product._id === productId && !flag)
    {
      setData({
        name: product.name,
        category: product?.category?._id,
        categoryDrug: product?.categoryDrug?._id,
        price: product.price,
        image: product.image,
        description: product.description,
        countInStock: product.countInStock,
        unit: product.unit,
        capacity: product.capacity,
        statusDrug: product.statusDrug,
        regisId: product.regisId,
        expDrug: product.expDrug
      })
      setFlag(true)
    }

  }, [product, flag, dispatch, productId, successUpdate, successUnitCreate, successUnitDelete]);


  return (
    <>
      <Toast />
      <MyVerticallyCenteredModal
        data={units}
        show={modalShow}
        loading={loadingUnitCreate || loadingUnitDelete}
        onHide={() => setModalShow(false)}
      />
      <section className="content-main">
        <form onSubmit={handleSubmit}>
          <div className="content-header">
            <Link to="/products" className="btn btn-danger text-white">
              Go to products
            </Link>
            <h2 className="content-title">Update Product</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Publish now
              </button>
            </div>
          </div>
          {/* name, price, description, image, countInStock */}
          <div className="mb-4">
            <div className="">
              <div className="card card-custom mb-4 shadow-sm">
                <div className="card-body">
                  {
                    loadingUpdate ? (<Loading />) : errorUpdate ? (<Message>{errorUpdate}</Message>) : ''
                  }
                  {
                    loading ? (<Loading />) : 
                    error || errorUnit || errorUnitCreate || errorUnitDelete ? 
                    (<Message>{error || errorUnit || errorUnitCreate || errorUnitDelete}</Message>) :''
                  }
                  <div className="mb-4">
                    <label htmlFor="name_drug" className="form-label">
                      Name drug
                    </label>
                    <input
                      onChange={handleChange}
                      value={name}
                      name="name"
                      type="text"
                      placeholder="Enter name drug"
                      className="form-control"
                      required
                    />  
                  </div>
                  <div className="mb-4 form-divided-2">
                    <div>
                      <label htmlFor="product_category" className="form-label">
                        Category
                      </label>
                      <select
                      value={category}
                      name="category"
                      onChange={handleChange}
                      className="form-control"
                      required >
                        <option value=''>Chosse Category</option>
                        {categories?.map((item, index)=>(
                          <option key={index} value={item._id}>{item.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="product_category_drug" className="form-label">
                        Category Drug
                      </label>
                      <select
                        value={categoryDrug}
                        name="categoryDrug"
                        onChange={handleChange}
                        className="form-control"
                        required >
                          <option value=''>Chosse Category Drug</option>
                          {categoriesDrug?.map((item, index)=>(
                            <option key={index} value={item._id}>{item.name}</option>
                          ))}
                      </select>
                    </div>     
                  </div>
                  <div className="mb-4 form-divided-2">
                    <div>
                      <label htmlFor="product_countInStock" className="form-label">
                        Count In Stock
                      </label>
                      <input
                        name="countInStock"
                        onChange={handleChange}
                        value={countInStock}
                        type="number"
                        placeholder="Type here"
                        className="form-control"
                        id="product_price"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="product_price" className="form-label">
                        Price
                      </label>
                      <input
                        name="price"
                        onChange={handleChange}
                        value={price}
                        type="number"
                        placeholder="Type here"
                        className="form-control"
                        id="product_price"
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-4 form-divided-2">
                    <div className="d-flex align-items-end">
                      <div style={{flexGrow:'1'}}>
                        <label htmlFor="unit" className="form-label">
                            Unit
                          </label>
                          <select
                            value={unit}
                            name="unit"
                            onChange={handleChange}
                            className="form-control"
                            required >
                            <option value=''>Chosse unit drug</option>
                            {units?.map((item, index)=>(
                              <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                      </div>
                      <div style={{marginLeft:'10px', transform: 'translateY(-3px)'}}>
                        <button className="circle-btn" onClick={(e)=>{
                          e.preventDefault();
                          setModalShow(true)
                        }}><i className="fas fa-plus"></i></button>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="product_regisId" className="form-label">
                          Regis number
                        </label>
                        <input
                          onChange={handleChange}
                          value={regisId}
                          name="regisId"
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          required
                        />
                    </div>
                  </div>
                  <div className="mb-4 form-divided-2">
                    <div>
                      <label htmlFor="capacity" className="form-label">
                        Capacity
                      </label>
                      <input
                        onChange={handleChange}
                        value={capacity}
                        name="capacity"
                        type="text"
                        placeholder="Type here"
                        className="form-control"
                        required
                        />
                    </div>
                    <div>
                      <label className="form-label">Exp drug</label>
                      <input
                        name="expDrug"
                        value={`${moment(expDrug).format('YYYY-MM-DD')}`}
                        className="form-control"
                        type='date'
                        required
                        onChange={handleChange}
                      ></input>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Description</label>
                    <textarea
                      placeholder="Type here"
                      className="form-control"
                      rows="7"
                      required
                      value={description}
                      name="description"
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div className="mb-4 form-divided-2">
                    <div>
                      <label className="form-label">Images</label>
                      <input
                      id="uploadFile"
                      required={image ? false : true} 
                      onChange={e => {
                        setData(prev => ({ ...prev, image: null }))
                        setImg(e.target.files[0])
                      }}
                      className="form-control" 
                      type="file" />
                      { (image || file)  && (
                        <div>     
                          <img src={(image ? product.image : URL.createObjectURL(file))}
                            alt="Product"
                            className="mt-3" 
                            style={{width: '250px', marginTop: '5px'}}/>
                          <span 
                            className="delete-button"
                            onClick={e => {
                              setImg(null)
                              setData(prev => ({ ...prev, image: null }))
                              document.getElementById('uploadFile').value = "";
                            }}
                            >&times;</span>
                        </div>
                      )}
                    </div>
                    <div className="form-check form-switch">
                      <label className="form-label d-flex">Status drug</label>
                      <input 
                        style={{ 
                          transform: 'scale(1.5)',
                          marginTop: '10px',
                          marginLeft: '10px'
                        }}
                        className="form-check-input" 
                        type="checkbox" 
                        id="flexSwitchCheckChecked" 
                        checked={statusDrug}
                        name="statusDrug"
                        onChange={() => setData(prev => {
                          return {
                            ...prev, statusDrug :!statusDrug
                          }
                        })}
                        />
                    </div>         
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default EditProductMain;
