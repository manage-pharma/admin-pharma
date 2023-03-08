import React, { useEffect, useState } from "react";
import {
  createImportStock,
  listImportStock,
} from "../../Redux/Actions/ImportStockAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { IMPORT_STOCK_CREATE_RESET } from "../../Redux/Constants/ImportStockConstant";
import { listProvider } from "../../Redux/Actions/ProviderAction";
import { listUser } from "../../Redux/Actions/UserActions";
import { listProduct } from "../../Redux/Actions/ProductActions";
import { Link, useHistory } from "react-router-dom";
import Toast from "../LoadingError/Toast";
import moment from "moment";
import renderToast from "../../util/Toast";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const AddInventoryCheck = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const createImportStockStatus = useSelector(
    (state) => state.importStockCreate
  );
  const { success } = createImportStockStatus;

  const productList = useSelector((state) => state.productList);
  const { products } = productList;

  const userList = useSelector((state) => state.userList);
  const { users } = userList;

  const [isStop, setIsStop] = useState(false);
  const [itemProducts, setItemProducts] = useState([]);
  const [field, setFieldProduct] = useState({
    name: "",
    product: "",
    lotNumber: "",
    expDrug: moment(new Date(Date.now())).format("YYYY-MM-DD"),
    price: 1,
    qty: 1,
  });

  const [data, setData] = useState({
    importedAt: moment(new Date(Date.now())).format("YYYY-MM-DD"),
  });

  var {
    note,
    importItems = itemProducts ? [...itemProducts] : [],
    user,
    totalPrice,
    importedAt,
  } = data;
  // eslint-disable-next-line
  const { name, product, lotNumber, expDrug, qty, price } = field;
  totalPrice = importItems.reduce(
    (sum, curr) => sum + curr.price * curr.qty,
    0
  );

  const handleChange = (e) => {
    e.preventDefault();
    setData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleChangeProduct = (e) => {
    e.preventDefault();
    setFieldProduct((prev) => {
      let a = document.getElementById("select-product");
      let b = a.options[a.selectedIndex];
      let c = b.getAttribute("data-foo");
      return {
        ...prev,
        name: c,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    let flag = false;

    if (!field.product) {
      if (!isStop) {
        renderToast("Sản phẩm chưa được chọn", "error", setIsStop, isStop);
      }
      return;
    } else if (field.price <= 0 || field.qty <= 0) {
      if (!isStop) {
        renderToast(
          "Giá nhập và số lượng nhập phải lớn hơn 0",
          "error",
          setIsStop,
          isStop
        );
      }
      return;
    } else {
      importItems.forEach((item, index) => {
        if (item.product === field.product) {
          flag = true;
          importItems.splice(index, 1, {
            ...item,
            lotNumber: field.lotNumber,
            price: parseInt(field.price),
            expDrug: field.expDrug,
            qty: item.qty + parseInt(field.qty),
          });
          setItemProducts(importItems);
        }
      });
      if (!flag) {
        setItemProducts((prev) => [...prev, { ...field, qty: parseInt(qty) }]);
      }
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createImportStock({
        ...data,
        importItems: importItems,
        totalPrice: importItems.reduce(
          (sum, curr) => sum + curr.price * curr.qty,
          0
        ),
      })
    );
  };
  const handleDeleteItem = (e, index) => {
    e.preventDefault();
    importItems.splice(index, 1);
    setItemProducts(importItems);
  };

  useEffect(() => {
    if (success) {
      toast.success(`Tạo đơn nhập thành công`, ToastObjects);
      dispatch({ type: IMPORT_STOCK_CREATE_RESET });
      setData({
        totalPrice: 0,
        importedAt: moment(new Date(Date.now())).format("YYYY-MM-DD"),
      });
      setFieldProduct({
        name: "",
        product: "",
        lotNumber: "",
        expDrug: moment(new Date(Date.now())).format("YYYY-MM-DD"),
        price: 0,
        qty: 0,
      });
      setItemProducts([]);
      dispatch(listImportStock());
    }
    dispatch(listProvider());
    dispatch(listProduct());
    dispatch(listUser());
  }, [success, dispatch]);

  return (
    <>
      <Toast />
      <section className="content-main">
        <form onSubmit={handleSubmit}>
          <div className="content-header">
            <div
              className="content-title d-flex"
              onClick={(e) => {
                e.preventDefault();
                history.push("/inventory-check");
              }}
            >
              <h4 className="arrow-breadcrum">
                <i className="fas fa-arrow-left"></i>
              </h4>
              <h3>Tạo biên bản kiểm kê kho</h3>
            </div>
            <div>
              <button type="submit" className="btn btn-primary">
                Tạo biên bản
              </button>
            </div>
          </div>
          <div className="mb-4">
            <div className="card card-custom mb-4 shadow-sm">
              <div className="card-body">
                <div className="mb-4 form-divided-2">
                  <div>
                    <label htmlFor="product_category" className="form-label">
                      Người kiểm
                    </label>
                    <select
                      value={user}
                      name="user"
                      onChange={handleChange}
                      className="form-control"
                      required
                    >
                      <option value="">Chọn người kiểm</option>
                      {users?.map((item, index) => (
                        <option key={index} value={item._id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <div>
                      <label className="form-label">Ngày kiểm</label>
                      <input
                        id="datePicker"
                        name="importedAt"
                        className="form-control"
                        type="date"
                        required
                        onChange={handleChange}
                        value={importedAt}
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="mb-4 form-divided-2">
                  <div>
                    <div>
                      <label className="form-label">Ghi chú</label>
                      <textarea
                        name="note"
                        placeholder="Nhập ghi chú, lý do kiểm, tình trạng khi kiểm,..."
                        className="form-control"
                        rows="4"
                        required
                        onChange={handleChange}
                        value={note}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <div className="card card-custom mb-4 shadow-sm">
              <div className="card-body">
                <div className="mb-4 form-divided-3">
                  <div>
                    <label htmlFor="product_category" className="form-label">
                      Tên thuốc
                    </label>
                    <select
                      id="select-product"
                      value={product}
                      name="product"
                      onChange={handleChangeProduct}
                      className="form-control"
                      required
                    >
                      <option value="">Chọn thuốc</option>
                      {products?.map((item, index) => (
                        <option
                          key={index}
                          value={item._id}
                          data-foo={item.name}
                        >
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Số lô</label>
                    <input
                      name="lotNumber"
                      value={lotNumber}
                      type="text"
                      className="form-control"
                      required
                      onChange={handleChangeProduct}
                    ></input>
                  </div>
                  <div>
                    <label className="form-label">Hạn sử dụng</label>
                    <input
                      name="expDrug"
                      value={expDrug}
                      type="Date"
                      className="form-control"
                      required
                      onChange={handleChangeProduct}
                    ></input>
                  </div>
                </div>
                <div className="mb-4 form-divided-2">
                  <div>
                    <label className="form-label">Giá nhập</label>
                    <input
                      name="price"
                      value={price}
                      type="number"
                      min="1"
                      className="form-control"
                      required
                      onChange={handleChangeProduct}
                    ></input>
                  </div>
                  <div>
                    <label htmlFor="qty" className="form-label">
                      Số lượng
                    </label>
                    <input
                      name="qty"
                      value={qty}
                      type="number"
                      min="1"
                      className="form-control"
                      required
                      onChange={handleChangeProduct}
                    />
                  </div>
                </div>
                <div className="mb-6 d-flex justify-content-end">
                  <button
                    className="btn btn-success"
                    onClick={handleAddProduct}
                  >
                    Thêm sản phẩm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
        <div className="card-body">
          <div className="row">
            <div className="card card-custom mb-4 shadow-sm">
              <header className="card-header bg-white ">
                <div className="row gx-3 py-3">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Tên thuốc</th>
                        <th scope="col">Số lô</th>
                        <th scope="col">Hạn sử dụng</th>
                        <th scope="col">Giá nhập</th>
                        <th scope="col">Số lượng</th>
                        <th scope="col">Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {itemProducts?.map((item, index) => (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>{item.name}</td>
                          <td>{item.lotNumber}</td>
                          <td>{moment(item.expDrug).format("DD-MM-YYYY")}</td>
                          <td>{item.price}</td>
                          <td>{item.qty}</td>

                          <td>
                            <div className="dropdown">
                              <Link
                                to="#"
                                data-bs-toggle="dropdown"
                                className="btn btn-light"
                              >
                                <i className="fas fa-ellipsis-h"></i>
                              </Link>
                              <div className="dropdown-menu">
                                {/* <button className="dropdown-item" onClick={(e)=>{
                                                e.stopPropagation()
                                                dispatch(singleProvider(provider._id))
                                                setShow(true)
                                            }}>
                                                Edit info
                                            </button> */}
                                <button
                                  className="dropdown-item text-danger"
                                  onClick={(e) => handleDeleteItem(e, index)}
                                >
                                  Xóa
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="mb-6 d-flex justify-content-end">
                    {`Tổng cộng: ${totalPrice}`}
                  </div>
                </div>
              </header>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddInventoryCheck;
