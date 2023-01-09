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

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const EditProductMain = (props) => {
  const { productId } = props;
  const dispatch = useDispatch();

  const [file, setImg] = useState(null) ;
  const [data, setData] = useState({
    name: '',
    price: 0,
    category: '',
    countInStock: 0,
    image: '',
    description: ''
  })
  const { name, category, price, countInStock, image, description } = data;
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

  const productEdit = useSelector((state) => state.productSingle);
  const { loading, error, product } = productEdit;

  const productUpdate = useSelector((state) => state.productUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;

  useEffect(() => {
    dispatch(listCategory())

    if (successUpdate) {
      dispatch({
        type: PRODUCT_UPDATE_RESET
      });
      toast.success("Product Updated", ToastObjects);
    }
    if (product._id !== productId) {
      dispatch(singleProduct(productId));
    } else {
      setData({
        name: product.name,
        category: product.category._id,
        price: product.price,
        image: product.image,
        description: product.description,
        countInStock: product.countInStock
      })
    }

  }, [product, dispatch, productId, successUpdate]);


  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
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

          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {
                    loadingUpdate ? (<Loading />) : errorUpdate ? (<Message>{errorUpdate}</Message>) : ''
                  }
                  {loading ? (
                    <Loading />
                  ) : error ? (
                    <Message variant="alert-danger">{error}</Message>
                  ) : (
                    <>
                      <div className="mb-4">
                        <label htmlFor="product_title" className="form-label">
                          Product title
                        </label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          id="product_title"
                          required
                          value={name}
                          name="name"
                          onChange={handleChange}
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
                          type="number"
                          placeholder="Type here"
                          className="form-control"
                          id="product_price"
                          required
                          value={price}
                          name="price"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_price" className="form-label">
                          Count In Stock
                        </label>
                        <input
                          type="number"
                          placeholder="Type here"
                          className="form-control"
                          id="product_price"
                          required
                          value={countInStock}
                          name="countInStock"
                          onChange={handleChange}
                        />
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
                      <div className="mb-4">
                        <label className="form-label">Images</label>
                        <input
                        id="uploadFile"
                        required
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
                    </>
                  )}
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
