import React,{useState,useEffect} from "react";
import {useHistory} from "react-router-dom";
import {useDispatch,useSelector} from "react-redux";
import Toast from "../LoadingError/Toast";
import {toast} from "react-toastify";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

import {singleDrugStore,updateDrugStore} from "../../Redux/Actions/DrugStoreActions";
import {DRUGSTORE_UPDATE_RESET} from "../../Redux/Constants/DrugStoreConstants";
import {Carousel} from "react-bootstrap";

const ToastObjects={
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const EditDrugStoreMain=(props) => {

  const {drugstoreId}=props;
  const dispatch=useDispatch();
  const history=useHistory();
  const [flag,setFlag]=useState(false);
  const [index,setIndex]=useState(0);
  const [data,setData]=useState({
    product: {},
    isActive: false,
    stock: [],
    discount: 0.0,
    refunded: 0.0
  })

  const handleChange=e => {
    setData(prev => {
      return {
        ...prev,[e.target.name]: e.target.value
      }
    })

  }

  const handleSubmit=async (e) => {
    e.preventDefault();
    dispatch(updateDrugStore({...data, drugstoreId}));
  }

  const drugstoreEdit=useSelector((state) => state.drugstoreSingle);
  const {loading, error, drugstore}=drugstoreEdit;
  const drugstoreUpdate=useSelector((state) => state.drugstoreUpdate);
  const {loading: loadingUpdate, error: errorUpdate, success: successUpdate}=drugstoreUpdate;
  const {isActive,stock, discount, refunded} = data;


  const handleSelect=(selectedIndex) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    if(successUpdate) {
      dispatch({
        type: DRUGSTORE_UPDATE_RESET
      });
      toast.success("Thuốc đã được cập nhật",ToastObjects);
    }
    if(drugstore._id!==drugstoreId) {
      dispatch(singleDrugStore(drugstoreId));
    }
    if(drugstore._id===drugstoreId && !flag) {
      setData({
        product: drugstore.product,
        isActive: drugstore.isActive,
        stock: drugstore.stock,
        discount: drugstore.discount,
        refunded: drugstore.refunded,
      })
      setFlag(true)
    }

  },[dispatch, drugstore, drugstoreId, flag, successUpdate]);

  return (
    <>
      <Toast />
      {loading || loadingUpdate ? (<Loading />) : error || errorUpdate ? (<Message>{error || errorUpdate}</Message>) : ''}
      <section className="content-main" >
        <form onSubmit={handleSubmit}>
          <div className="content-header">
            <div className="content-title d-flex" onClick={e => {
              e.preventDefault()
              history.push("/drugstore")
            }}>
              <h4 className="arrow-breadcrum"><i className="fas fa-arrow-left"></i></h4>
              <h4>Cập nhật dược phẩm : <span className="text-danger">{data?.product?.name}</span></h4>
            </div>
          </div>

          <div className="mb-4">
            <div className="">

              <div className="row p-3">
                <div className="col-md-12 col-lg-8 card card-custom mb-4 pt-3">
                  <div>
                    <button type="button" className="btn btn-primary mb-4" style={{float: 'right'}}
                      onClick={() => {history.push(`product/${data.product._id}`)}}
                    >
                      Cập nhật thông tin
                    </button>
                  </div>
                  
                  <div className="mb-4 form-divided-2 ">
                    <div>
                      <label htmlFor="name_drug" className="form-label">
                        Tên thuốc
                      </label>
                      <input
                        onChange={handleChange}
                        value={data?.product?.name}
                        name="name"
                        type="text"
                        placeholder="Nhập tên thuốc"
                        className="form-control"
                        disabled
                      />
                    </div>
                    <div>
                      <label htmlFor="brandName" className="form-label">
                        Tên biệt dược
                      </label>
                      <input
                        onChange={handleChange}
                        value={data?.product?.brandName}
                        name="brandName"
                        type="text"
                        placeholder="Nhập tên biệt dược"
                        className="form-control"
                        disabled
                      />
                    </div>
                    
                    
                  </div>
                  <div className="mb-4 form-divided-3 ">
                    <div>
                      <label htmlFor="name_drug" className="form-label">
                        Xuất xứ
                      </label>
                      <input
                        onChange={handleChange}
                        value={data?.product?.countryOfOrigin}
                        name="name"
                        type="text"
                        placeholder="Nhập xuất xứ"
                        className="form-control"
                        disabled
                      />
                    </div>
                    <div>
                      <label htmlFor="price" className="form-label">
                        Giá
                      </label>
                      <input
                        onChange={handleChange}
                        value={data?.product?.price}
                        name="price"
                        type="text"
                        placeholder="Nhập tên biệt dược"
                        className="form-control"
                        disabled
                      />
                    </div>
                    <div>
                      <label htmlFor="product_regisId" className="form-label">
                        Đánh giá
                      </label>
                      <input
                        onChange={handleChange}
                        value={data?.product?.rating}
                        name="regisId"
                        type="text"
                        placeholder="Nhập số đăng ký"
                        className="form-control"
                        disabled
                      />
                    </div>
                  </div>
                  <div className="w-100 mb-4"  >
                      <label htmlFor="product_regisId" className="form-label">
                        Các hoạt chất
                      </label>
                    <div className="card card-custom">
                      
                      <header className="card-header bg-aliceblue" style={{height: '150px',overflowY: 'scroll'}}>
                        <table className="table" >
                          <thead>
                            <tr>
                              <th scope="col">Hoạt chất</th>
                              <th scope="col">Hàm lượng</th>

                            </tr>
                          </thead>
                          <tbody >
                            {data?.product?.APIs?.map((item,index) => (
                              <tr key={index}>
                                <td>{item.API}</td>
                                <td>{item.content}</td>

                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </header>
                    </div>
                  </div>
                  <div className="w-100 mb-4"  >
                      <label htmlFor="product_regisId" className="form-label">
                        Số lượng chi tiết
                      </label>
                    <div className="card card-custom">
                      <header className="card-header bg-aliceblue" style={{height: '150px',overflowY: 'scroll'}}>
                        <table className="table" >
                          <thead>
                            <tr>
                              <th scope="col">STT</th>
                              <th scope="col">Số lô</th>
                              <th scope="col">Số lượng</th>
                              <th scope="col">Hạn sử dụng</th>
                            </tr>
                          </thead>
                          <tbody >
                            {stock?.map((item,index) => (
                              <tr key={index}>
                                <td>{index+1}</td>
                                <td>{item.lotNumber}</td>
                                <td>{item.count}</td>
                                <td>{item.expDrug}</td>

                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </header>
                    </div>
                  </div>                  
                  <div className="p-5">
                    <Carousel activeIndex={index} onSelect={handleSelect}>
                      {
                        data?.product?.image?.map((item,index) => {
                          return (
                            <Carousel.Item>
                              <img
                                className="d-block w-100"
                                src={item}
                                alt="First slide"
                              />
                              <Carousel.Caption>
                                <h3>{index+1}</h3>

                              </Carousel.Caption>
                            </Carousel.Item>
                          )
                        })
                      }
                    </Carousel>
                  </div>

                </div>
                <div className="col-md-12 col-lg-4  pt-3">
                  <div className="mb-4">
                    <label htmlFor="product_regisId" className="form-label">
                      Số lượng tổng
                    </label>
                    <input
                      //onChange={handleChange}
                      value={stock?.reduce((sum,item)=>{
                        return sum+item.count
                      },0)}
                      name=""
                      type="number"
                      placeholder="Nhập số lượng"
                      className="form-control"
                      disabled
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_regisId" className="form-label">
                      Giảm giá
                    </label>
                    <input
                      onChange={handleChange}
                      value={discount}
                      name="discount"
                      type="number"
                      placeholder="Nhập % khuyến mãi"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_regisId" className="form-label">
                      Hoàn trả
                    </label>
                    <input
                      onChange={handleChange}
                      value={refunded}
                      name="refunded"
                      type="number"
                      placeholder="Nhập % hoàn trả"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Đăng bán</label>
                    <label className="switch" htmlFor="checkbox">
                      <input
                        type="checkbox"
                        id="checkbox"
                        checked={isActive}
                        name="isActive"
                        onChange={() => setData(prev => {
                          return {
                            ...prev,isActive: !isActive
                          }
                        })}
                      />
                      <div className="slider round"></div>
                    </label>
                  </div>
                  <div>
                    <button type="submit" className="btn btn-primary mb-4" style={{float: 'right'}}>
                      Cập nhật
                    </button>
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

export default EditDrugStoreMain;
