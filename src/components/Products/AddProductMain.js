import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { PRODUCT_CREATE_RESET } from "../../Redux/Constants/ProductConstants";
import { createProduct } from "../../Redux/Actions/ProductActions";
import Toast from "../LoadingError/Toast";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import axios from "axios";
import { listCategory } from './../../Redux/Actions/CategoryAction';
import { listCategoryDrug } from './../../Redux/Actions/CategoryDrugAction';
import { listUnit } from './../../Redux/Actions/UnitAction';
import MyVerticallyCenteredModal from "./ModalUnit";
import { UNIT_CREATE_RESET, UNIT_DELETE_RESET } from "../../Redux/Constants/UnitConstants";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const AddProductMain = () => {
  const dispatch = useDispatch();

  const itemProducts = [
    {
      hoatchat: 'lorem',
      hamluong: '12g'
    },
    {
      hoatchat: 'axit',
      hamluong: '1g'
    },
    {
      hoatchat: 'sugar',
      hamluong: '13g'
    },
  ]

  const [file, setImg] = useState(null) ;
  const [modalShow, setModalShow] = useState(false);
  const [data, setData] = useState({name: '', price: 0, description: '', image: '', countInStock: 0, unit: '', regisId: '', capacity: '', expDrug: Date.now, statusDrug: true})
  const productCreate = useSelector(state => state.productCreate);
  const { loading, product, error } = productCreate;

  const categoryList = useSelector((state)=> state.categoryList)
  const {categories} = categoryList

  const categoryDrugList = useSelector((state)=> state.categoryDrugList)
  const {categoriesDrug} = categoryDrugList

  const unitList = useSelector(state => state.unitList)
  const {error: errorUnit, units} = unitList

  const unitCreated = useSelector(state => state.unitCreate)
  const {loading: loadingUnitCreate, error: errorUnitCreate, success: successUnitCreate} = unitCreated

  const unitDeleted = useSelector(state => state.unitDelete)
  const {loading: loadingUnitDelete, error: errorUnitDelete, success: successUnitDelete} = unitDeleted

  const handleChange = e => {
    setData(prev => {
      return {
        ...prev, [e.target.name] : e.target.value
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
      dispatch(createProduct({ ...data }));
      setData({
        name: '',
        price: 0,
        description: '',
        countInStock: 0,
        unit: '',
        capacity: '',
        regisId: '',
        expDrug: Date.now,
        statusDrug: true
      })
      setImg(null)
      document.getElementById('uploadFile').value = "";
    }
  }

  useEffect(() => {
    if (product) {
      toast.success("Product added", ToastObjects);
      dispatch({ type: PRODUCT_CREATE_RESET })
    }
    if(successUnitCreate){
      toast.success("Unit added", ToastObjects);
      dispatch({ type: UNIT_CREATE_RESET })
    }
    if(successUnitDelete){
      toast.success("Unit deleted", ToastObjects);
      dispatch({ type: UNIT_DELETE_RESET })
    }
    dispatch(listCategory())
    dispatch(listCategoryDrug())
    dispatch(listUnit())
  }, [dispatch, product, successUnitCreate, successUnitDelete])
  // name, regisId, category, categoryDrug, unit, packing, APIS, branchName, manufacturer, countryOfOrigin, instruction, price, allowToSell, prescription, description, image
  const { name, price, description, category, categoryDrug, unit, regisId, expDrug, capacity, statusDrug } = data;
  return (
    <>
      <Toast />
      <MyVerticallyCenteredModal
        data={units}
        show={modalShow}
        loading={loadingUnitCreate || loadingUnitDelete}
        onHide={() => setModalShow(false)}
      />
      <section className="content-main" >
        <form onSubmit={handleSubmit}>
          <div className="content-header">
            <Link to="/products" className="btn btn-danger text-white">
              Go to products
            </Link>
            <h2 className="content-title">Add product</h2>
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
                    loading ? (<Loading />) : 
                    error || errorUnit || errorUnitCreate || errorUnitDelete ? 
                    (<Message>{error || errorUnit || errorUnitCreate || errorUnitDelete}</Message>)  : ''
                  }
                  {/* //! tên thuốc - tên biệt dược - số đăng ký */}
                  <div className="mb-4 form-divided-3">
                    <div>
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
                    <div>
                      <label htmlFor="name_drug" className="form-label">
                        Branch name
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
                  {/* // ! danh mục hàng hóa - danh mục thuốc - thuốc kê đơn  */}
                  <div className="mb-4 form-divided-3">
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

                    <div>
                      <label htmlFor="product_category_drug" className="form-label">
                        Prescription
                      </label>
                      <select
                      value={categoryDrug}
                      name="categoryDrug"
                      onChange={handleChange}
                      className="form-control"
                      required >
                        <option value='true'>Thuốc kê đơn</option>
                        <option value='false'>Thuốc không kê đơn</option>
                      </select>
                    </div>
                  </div>
                  {/* // ! (đơn vị tính - giá - quy cách đóng gói) - (hoạt chất -hàm lượng)*/}
                  <div className="mb-4 form-divided-custom-2">
                    <div className="d-block">
                      <div className="d-flex align-items-end mb-4">
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
                      <div className="mb-4">
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
                      <div>
                        <label htmlFor="product_packing" className="form-label">
                          Packing
                        </label>
                        <input
                          name="packing"
                          onChange={handleChange}

                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          id="product_packing"
                          required
                        />
                      </div>
                    </div>
                    <div className="d-flex flex-wrap">
                      <div style={{display: 'flex', gridGap: '30px', width: '-webkit-fill-available'}}>
                        <div className="d-flex align-items-end w-50 mb-3">
                          <div style={{flexGrow:'1'}}>
                          <label htmlFor="unit" className="form-label">
                              Hoạt chất
                            </label>
                            <select
                              value={unit}
                              name="unit"
                              onChange={handleChange}
                              className="form-control"
                              required >
                              <option value=''>Chọn hoạt chất</option>
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
                        <div className="w-50 mb-3">
                          <label htmlFor="product_packing" className="form-label">
                            Hàm lượng
                          </label>
                          <input
                            name="packing"
                            onChange={handleChange}

                            type="text"
                            placeholder="Type here"
                            className="form-control"
                            id="product_packing"
                            required
                          />
                        </div>
                      </div>

                      <div className="w-100">
                        <div className="card card-custom">
                          <header className="card-header bg-white" style={{height: '170px', overflowY: 'scroll'}}>
                            <table className="table">
                              <thead>
                                <tr>
                                    <th scope="col">Hoạt chất</th>
                                    <th scope="col">hàm lượng</th>
                                    <th scope="col">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {itemProducts?.map((item, index)=>(
                                  <tr key={index}>
                                  <td>{ item.hoatchat }</td>
                                  <td>{ item.hamluong}</td>
                                  <td>
                                    <button className="dropdown-item text-danger">
                                    <i className="fas fa-trash"></i>
                                    </button>
                                  </td>
                                  </tr> 
                                ))}
                              </tbody>
                            </table>
                          </header>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* // ! nhà sản xuất và nước sản xuất */}
                  <div className="mb-4 form-divided-2">
                    <div className="d-flex align-items-end">
                      <div style={{flexGrow:'1'}}>
                        <label htmlFor="unit" className="form-label">
                          Nhà sản xuất
                        </label>
                        <select
                          value={unit}
                          name="unit"
                          onChange={handleChange}
                          className="form-control"
                          required >
                          <option value=''>Chọn nước sản xuất</option>
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
                    <div className="d-flex align-items-end">
                      <div style={{flexGrow:'1'}}>
                        <label htmlFor="unit" className="form-label">
                          Nước sản xuất
                        </label>
                        <select
                          value={unit}
                          name="unit"
                          onChange={handleChange}
                          className="form-control"
                          required >
                          <option value=''>Chọn nước sản xuất</option>
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
                  </div>
                  {/* // ! mô tả - lời chỉ dẫn */}
                  <div className="mb-4 form-divided-2">
                    <div>
                      <label className="form-label">Description</label>
                      <textarea
                        name="description"
                        placeholder="Type here"
                        className="form-control"
                        rows="4"
                        required
                        onChange={handleChange}
                        value={description}
                      ></textarea>
                    </div>
                    <div>
                      <label className="form-label">Lời chỉ dẫn</label>
                      <textarea
                        name="description"
                        placeholder="Type here"
                        className="form-control"
                        rows="4"
                        required
                        onChange={handleChange}
                        value={description}
                      ></textarea>
                    </div>
                  </div>
                  {/* // ! ảnh - cho phép bán */}
                  <div className="mb-4 form-divided-3">
                    <div>
                      <label className="form-label">Images</label>
                      <input
                      id="uploadFile"
                      onChange={e => setImg(e.target.files[0])}
                      className="form-control" type="file" />
                      { file && (
                        <div>     
                          <img src={(file && URL.createObjectURL(file))}
                            alt="Product"
                            className="mt-3" 
                            style={{width: '250px', marginTop: '5px'}}/>
                          <span 
                            className="delete-button"
                            onClick={e => {
                              setImg(null)
                              document.getElementById('uploadFile').value = "";
                            }}
                            >&times;</span>
                        </div>
                      )}
                    </div>
                    <div className="form-check form-switch">
                      <label className="form-label d-flex">Thuốc được phép bán</label>
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

export default AddProductMain;
