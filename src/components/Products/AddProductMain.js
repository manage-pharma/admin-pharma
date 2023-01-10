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
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const AddProductMain = () => {
  const dispatch = useDispatch();

  const [file, setImg] = useState(null) ;
  const [data, setData] = useState({name: '', price: 0, description: '', image: '', countInStock: 0, unit: '', regisId: '', capacity: '', expDrug: Date.now, statusDrug: true})
  const productCreate = useSelector(state => state.productCreate);
  const { loading, product, error } = productCreate;

  const categoryList = useSelector((state)=> state.categoryList)
  const {categories} = categoryList
  const categoryDrugList = useSelector((state)=> state.categoryDrugList)
  const {categoriesDrug} = categoryDrugList

  const UnitArr = ['Hộp', 'Vỉ', 'Viên', 'Chai', "Lọ"]
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
    }
  }

  useEffect(() => {
    dispatch(listCategory())
    dispatch(listCategoryDrug())
    if (product) {
      toast.success("Product Added", ToastObjects);
      dispatch({ type: PRODUCT_CREATE_RESET })
    }
  }, [dispatch, product])

  const { name, price, description, countInStock, category, categoryDrug, unit, regisId, expDrug, capacity, statusDrug } = data;
  return (
    <>
      <Toast />
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
                    loading ? (<Loading />) : error ? (<Message>{error}</Message>) : ''
                  }
                  <div className="mb-4">
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
                    <div>
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
                          {UnitArr?.map((item, index)=>(
                            <option key={index} value={item}>{item}</option>
                          ))}
                      </select>
                        {/* <input
                          onChange={handleChange}
                          value={unit}
                          name="unit"
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          required
                        /> */}
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
                        className="form-control"
                        type='date'
                        required
                        onChange={handleChange}
                        value={expDrug}
                      ></input>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Description</label>
                    <textarea
                      name="description"
                      placeholder="Type here"
                      className="form-control"
                      rows="7"
                      required
                      onChange={handleChange}
                      value={description}
                    ></textarea>
                  </div>
                  <div className="mb-4 form-divided-2">
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

export default AddProductMain;
