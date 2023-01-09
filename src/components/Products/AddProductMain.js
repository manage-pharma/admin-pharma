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
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const AddProductMain = () => {
  const dispatch = useDispatch();

  const [file, setImg] = useState(null) ;
  const [data, setData] = useState({name: '', price: 0, description: '', image: '', countInStock: 0})
  const productCreate = useSelector(state => state.productCreate);
  const { loading, product, error } = productCreate;

  const categoryList = useSelector((state)=> state.categoryList)
  const {categories} = categoryList
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
        countInStock: 0
      })
    }
  }

  useEffect(() => {
    dispatch(listCategory())
    if (product) {
      toast.success("Product Added", ToastObjects);
      dispatch({ type: PRODUCT_CREATE_RESET })
    }
  }, [dispatch, product])

  const { name, price, description, countInStock, category } = data;
  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
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
          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {
                    loading ? (<Loading />) : error ? (<Message>{error}</Message>) : ''
                  }
                  <div className="mb-4">
                    <label htmlFor="product_title" className="form-label">
                      Product title
                    </label>
                    <input
                      onChange={handleChange}
                      value={name}
                      name="name"
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="product_title"
                      required
                    />  
                  </div>
                  <div className="mb-4">
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
                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
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
                  <div className="mb-4">
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
