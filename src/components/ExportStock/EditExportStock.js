import React, { useEffect, useState } from "react";
import {
  singleExportStock,
  updateExportStock,
} from "../../Redux/Actions/ExportStockAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { listUser } from "../../Redux/Actions/UserActions";
import { Link, useHistory } from "react-router-dom";
import Toast from "../LoadingError/Toast";
import {
  EXPORT_STOCK_DETAILS_RESET,
  EXPORT_STOCK_UPDATE_RESET,
} from "../../Redux/Constants/ExportStockConstant";
import moment from "moment";
import { listProduct } from "./../../Redux/Actions/ProductActions";
import renderToast from "../../util/Toast";
import { listInventory } from "../../Redux/Actions/InventoryAction";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const EditImportStock = (props) => {
  const { exportId } = props;
  const dispatch = useDispatch();
  const history = useHistory();

  const exportDetail = useSelector((state) => state.exportStockDetail);
  const { exportStockItem } = exportDetail;

  const inventoryList = useSelector((state) => state.inventoryList);
  const { inventories } = inventoryList;
  const [inventoriesClone, setInventoriesClone] = useState([]);
  const [qtyLot, setqtyLost] = useState([]);
  useEffect(() => {
    if (inventories?.length > 0) {
      setInventoriesClone([...inventories]);
    }
  }, [inventories]);
  const userList = useSelector((state) => state.userList);
  const { users } = userList;
  const exportUpdate = useSelector((state) => state.exportStockUpdate);
  const { success } = exportUpdate;

  const [isStop, setIsStop] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [itemProducts, setItemProducts] = useState([]);
  const [globalFlag, setGlobalFlag] = useState(false);

  const [field, setFieldProduct] = useState({
    countInStock: 0,
    name: "",
    product: "",
    price: 0,
    qty: 0,
    lotField: [],
  });

  const [data, setData] = useState({
    customer: "",
    phone: "",
    address: "",
    note: "",
    exportedAt: moment(new Date(Date.now())).format("YYYY-MM-DD"),
  });

  var {
    customer,
    phone,
    address,
    note,
    exportItems = itemProducts ? [...itemProducts] : [],
    user,
    totalPrice,
    exportedAt,
  } = data;

  const { product, lotField } = field;
  totalPrice = itemProducts.reduce(
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
  const handleChangeQuantity = (e, index, expDrug) => {
    const { value, name } = e.target;
    const updateQtyLot = [...qtyLot];
    updateQtyLot[index] = {
      name,
      value,
      expDrug,
    };
    setqtyLost(updateQtyLot);
  };
  
  const refreshField = () => {
    const inputElements = document.querySelectorAll("#list-lot input");
    inputElements.forEach((input, index) => {
      input.value = "";
    });
    setqtyLost([]);
  };
  const checkQtyLot = () => {
    const data = {
      isError: false,
      newData: [],
    };
    const inputElements = document.querySelectorAll("#list-lot input");
    inputElements.forEach((input, index) => {
      const lotNumberData = input.dataset.lotnumber;
      const qtyLotData = input.dataset.qtylot;
      const id = input.dataset.id;
      const expDrug = input.dataset.expdrug;
      if (!qtyLot[index]) {
        data.isError = true;
        toast.error(`Số lượng không được để trống`, ToastObjects);
        return;
      }
      if (isNaN(parseInt(qtyLot[index].value))) {
        data.isError = true;
        toast.error(`Số lượng phải là số`, ToastObjects);
        return;
      }
      if (
        lotNumberData === qtyLot[index].name &&
        expDrug === qtyLot[index].expDrug
      ) {
        if (parseInt(qtyLotData) < parseInt(qtyLot[index].value)) {
          data.isError = true;

          toast.error(
            `Quantity is greater than quantity of Lot ${lotNumberData} (${qtyLotData}) in stock`,
            ToastObjects
          );
          return;
        } else {
          data.newData.push({
            _id: id,
            lotNumber: lotNumberData,
            count: parseInt(qtyLot[index].value),
            expDrug,
          });
        }
      }
    });
    return data;
  };

  const checkExistProduct = (id, arrayProduct) => {
    let index = -1;
    let product = {};
    for (let i = 0; i < arrayProduct.length; i++) {
      if (id === arrayProduct[i].product._id) {
        return { index: i, product: arrayProduct[i] };
      }
    }
    return { index, product };
  };
  const handleChangeProduct = (e) => {
    e.preventDefault();
    if (!isEdited) {
      setIsEdited(true);
    }
    let idProduct = e.target.value;
    let a = document.getElementById("select-product");
    let b = a.options[a.selectedIndex];
    let c = b.getAttribute("data-foo");

    let b1 = a.options[a.selectedIndex];
    let c1 = b1.getAttribute("data-countinstock");

    let d = a.options[a.selectedIndex];
    let d1 = d.getAttribute("data-lotlist");
    refreshField();
    const { index, product } = checkExistProduct(idProduct, itemProducts);
    if (index === -1) {
      setGlobalFlag(false);
      setFieldProduct((prev) => {
        return {
          ...prev,
          name: c,
          countInStock: c1,
          qty: 0,
          lotField: d1 ? [...JSON.parse(d1)] : [],
          [e.target.name]: e.target.value,
        };
      });
    } else {
      setGlobalFlag(true);
      const findProduct = inventories.find((item) => item.idDrug === idProduct);
      const newLotField = findProduct?.products?.map((lot, index) => {
        let positon = CheckLotWhenSelect(lot, product);
        return positon !== -1
          ? {
              ...lot,
              count:
                parseInt(lot?.count) -
                parseInt(product?.lotField?.[positon]?.count),
            }
          : lot;
      });

      setFieldProduct((prev) => {
        return {
          ...prev,
          name: c,
          countInStock: c1,
          qty: 0,
          lotField: [...newLotField],
          [e.target.name]: e.target.value,
        };
      });
    }
  };

  const CheckLotWhenSelect = (lot, product) => {
    let index = -1;
    for (let i = 0; i < product.lotField.length; i++) {
      if (
        lot.lotNumber === product.lotField[i].lotNumber &&
        lot.expDrug === product.lotField[i].expDrug
      ) {
        return (index = i);
      }
    }
    return index;
  };
  const vonglap = (product, newData) => {
    let index = -1;
    for (let i = 0; i < newData.length; i++) {
      if (
        product.lotNumber === newData[i].lotNumber &&
        product.expDrug === newData[i].expDrug
      ) {
        return (index = i);
      }
    }
    return index;
  };
  const EditDataMinus = (id, newData) => {
    const findProductIndex = inventoriesClone.findIndex((item) => {
      return item.idDrug === id.toString();
    });
    const findProduct = inventoriesClone.find((item) => item.idDrug === id);
    let a = [];
    if (!globalFlag) {
      if (findProductIndex > -1) {
        a = findProduct.products.map((product) => {
          let positon = vonglap(product, newData);
          return positon !== -1
            ? {
                ...product,
                count:
                  parseInt(product.count) - parseInt(newData[positon].count),
              }
            : product;
        });
      }
    } else {
      a = lotField.map((product, index) => {
        let positon = vonglap(product, newData);
        return positon !== -1
          ? {
              ...product,
              count: parseInt(product.count) - parseInt(newData[positon].count),
            }
          : product;
      });
    }
    inventoriesClone.splice(findProductIndex, 1, {
      ...findProduct,
      products: [...a],
    });
    setFieldProduct((prev) => {
      return {
        ...prev,
        lotField: [...a],
      };
    });
  };
  const handleAddProduct = (e) => {
    e.preventDefault();
    let flag = false;
    const sumUserInput = qtyLot.reduce((accumulator, currentValue) => {
      return accumulator + parseInt(currentValue.value);
    }, 0);
    const checkNegative = inventoriesClone.some(
      (item) => parseInt(item.value) < 0
    );

    if (checkNegative) {
      toast.error(
        `Sản phẩm dưới mức âm, không thể thêm tiếp tục vào danh sách`,
        ToastObjects
      );
      return;
    }

    const { isError, newData } = checkQtyLot();
    if (isError) {
      return;
    }
    if (parseInt(sumUserInput) > parseInt(field.countInStock)) {
      toast.error(
        `Quantity is greater than quantity of ${field.name} (${field.countInStock}) in stock`,
        ToastObjects
      );
      return;
    }
    if (!field.product) {
      if (!isStop) {
        renderToast(
          "The product has not been selected",
          "error",
          setIsStop,
          isStop
        );
      }
      return;
    } else if (sumUserInput <= 0) {
      if (!isStop) {
        renderToast("Quantity have to greater 0", "error", setIsStop, isStop);
      }
      return;
    }
    itemProducts.forEach((item, index) => {
      if ((item.product._id || item.product) === field.product) {
        let a = (item.product.qty || item.qty) + parseInt(sumUserInput);
        if (parseInt(a) > parseInt(field.countInStock)) {
          flag = true;
          toast.error(
            `Quantity is greater than quantity of ${field.name} (${field.countInStock}) in stock`,
            ToastObjects
          );
          return;
        } else {
          flag = true;
          const newLotfieldArray = item.lotField.map((f, index) => {
            return {
              ...f,
              count: f.count + parseInt(qtyLot[index].value),
            };
          });
          itemProducts.splice(index, 1, {
            ...item,
            qty: (item.qty += parseInt(sumUserInput)),
            lotField: [...newLotfieldArray],
          });
          EditDataMinus(item.product._id || item.product, newData);
          setItemProducts(itemProducts);
        }
      }
    });
    if (!flag) {
      const newLotfieldArray = field.lotField.map((f, index) => {
        return {
          count: parseInt(qtyLot[index].value),
          idDrug: f.idDrug,
          lotNumber: f.lotNumber,
          expDrug: f.expDrug,
        };
      });
      setItemProducts((prev) => [
        ...prev,
        {
          ...field,
          qty: parseInt(sumUserInput),
          lotField: [...newLotfieldArray],
        },
      ]);
      EditDataMinus(field.product, newData);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateExportStock({
        ...data,
        exportItems: itemProducts,
        exportId,
      })
    );
    setFieldProduct({
      countInStock: 0,
      name: "",
      product: "",
      price: 0,
      qty: 0,
      lotField: [],
    });
  };
  const handleDeleteItem = (e, index, id) => {
    e.preventDefault();
    if (!isEdited) {
      setIsEdited(true);
    }
    itemProducts.splice(index, 1);
    const findProductIndex = inventories.findIndex((item) => {
      return item.idDrug === id;
    });
    const findProduct = inventories.find((item) => {
      return item.idDrug === id;
    });
    inventoriesClone.splice(findProductIndex, 1, {
      ...findProduct,
    });
    setFieldProduct(() => {
      return {
        countInStock: findProduct.total_count,
        name: findProduct.name,
        product: findProduct.idDrug,
        price: 0,
        qty: 0,
        lotField: [...findProduct.products],
      };
    });
    setItemProducts(JSON.parse(JSON.stringify(itemProducts)));
  };

  useEffect(() => {
    dispatch(listUser());
    dispatch(listProduct());
    dispatch(listInventory());
    if (success) {
      toast.success(`Updated successfully`, ToastObjects);
      dispatch({ type: EXPORT_STOCK_UPDATE_RESET });
      dispatch({ type: EXPORT_STOCK_DETAILS_RESET });
      dispatch(singleExportStock(exportId));
    }
    if (exportId !== exportStockItem?._id) {
      dispatch(singleExportStock(exportId));
    } else if (exportId === exportStockItem?._id && !isEdited) {
      setData({
        customer: exportStockItem?.customer,
        phone: exportStockItem?.phone,
        address: exportStockItem?.address,
        note: exportStockItem?.note,
        user: exportStockItem?.user?._id,
        exportItems: exportStockItem?.exportItems,
        totalPrice: exportStockItem.totalPrice,
        exportedAt: moment(exportStockItem.exportedAt).format("YYYY-MM-DD"),
        status: exportStockItem.status,
      });
      if (itemProducts.length === 0 && !isEdited) {
        setItemProducts(
          JSON.parse(JSON.stringify(exportStockItem?.exportItems))
        );
      }
    } // eslint-disable-next-line
  }, [dispatch, exportStockItem, exportId, isEdited, success]);
  return (
    <>
      <Toast />
      <section
        className={`content-main ${exportStockItem?.status ? "disabled" : ""}`}
      >
        <form onSubmit={handleSubmit}>
          <div className="content-header">
            <div
              className="content-title d-flex"
              onClick={(e) => {
                // e.preventDefault();
                history.push("/export-stock");
              }}
            >
              <h4 className="arrow-breadcrum">
                <i className="fas fa-arrow-left"></i>
              </h4>
              <h3 className="content-title">
                Export code:{" "}
                <span className="text-danger">
                  {exportStockItem?.exportCode}
                </span>
              </h3>
            </div>
            <div>
              {exportStockItem?.status ? (
                <h4>
                  <span className="badge bg-danger text-white">
                    This export is complete, you cannot edit
                  </span>
                </h4>
              ) : (
                <button type="submit" className="btn btn-primary">
                  Update now
                </button>
              )}
            </div>
          </div>
          <div className="mb-4">
            <div className="card card-custom mb-4 shadow-sm">
              <div className="card-body">
                <div className="mb-4 form-divided-2">
                  <div>
                    <label htmlFor="customer" className="form-label">
                      Customer name
                    </label>
                    <input
                      name="customer"
                      value={customer}
                      type="text"
                      className="form-control"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="form-label">
                      Phone
                    </label>
                    <input
                      name="phone"
                      value={phone}
                      type="text"
                      className="form-control"
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="mb-4 form-divided-2">
                  <div>
                    <label className="form-label">Exported At</label>
                    <input
                      id="datePicker"
                      name="exportedAt"
                      className="form-control"
                      type="date"
                      required
                      onChange={handleChange}
                      value={exportedAt}
                    ></input>
                  </div>
                  <div>
                    <label htmlFor="product_category" className="form-label">
                      User
                    </label>
                    <select
                      value={user}
                      name="user"
                      onChange={handleChange}
                      className="form-control"
                      required
                    >
                      <option value="">Chosse user</option>
                      {users?.map((item, index) => (
                        <option key={index} value={item._id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mb-4 form-divided-2">
                  <div>
                    <label className="form-label">Address</label>
                    <textarea
                      name="address"
                      placeholder="Type here"
                      className="form-control"
                      rows="3"
                      required
                      onChange={handleChange}
                      value={address}
                    ></textarea>
                  </div>
                  <div>
                    <label className="form-label">Note</label>
                    <textarea
                      name="note"
                      placeholder="Type here"
                      className="form-control"
                      rows="3"
                      required
                      onChange={handleChange}
                      value={note}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <div className="card card-custom mb-4 shadow-sm">
              <div className="card-body">
                <div className="mb-4">
                  <label htmlFor="product_category" className="form-label">
                    Product
                  </label>
                  <select
                    id="select-product"
                    value={product}
                    name="product"
                    onChange={handleChangeProduct}
                    className="form-control"
                  >
                    <option value="">Chosse product</option>
                    {inventoriesClone?.map((item, index) => (
                      <option
                        key={index}
                        value={item.idDrug}
                        data-foo={item.name}
                        data-countinstock={item.total_count}
                        data-lotlist={JSON.stringify(item.products)}
                      >
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  {lotField?.length > 0 && (
                    <label htmlFor="product_category" className="form-label">
                      Danh sách lô:
                    </label>
                  )}
                  {lotField?.map((lot, index) => {
                    return (
                      <div
                        id="list-lot"
                        key={index}
                        className="mb-4 form-divided-2"
                      >
                        <label>
                          Số lô: {lot.lotNumber} (tồn: {lot.count}) (HSD:{" "}
                          {moment(lot.expDrug).format("DD-MM-YYYY")})
                        </label>
                        <input
                          name={lot.lotNumber}
                          type="number"
                          data-lotnumber={lot.lotNumber}
                          data-qtylot={lot.count}
                          data-id={lot._id}
                          data-expdrug={lot.expDrug}
                          className="form-control"
                          onChange={(e) =>
                            handleChangeQuantity(e, index, lot.expDrug)
                          }
                        ></input>
                      </div>
                    );
                  })}
                </div>
                <hr />
                <div className="mb-6 d-flex justify-content-end">
                  {exportStockItem?.status ? (
                    ""
                  ) : (
                    <button
                      className="btn btn-success"
                      onClick={handleAddProduct}
                    >
                      Add Product
                    </button>
                  )}
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
                        <th scope="col">Name</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {itemProducts?.map((item, index) => (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>{item?.product?.name || item?.name}</td>
                          <td>{item?.qty}</td>
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
                                <button
                                  className="dropdown-item text-danger"
                                  onClick={(e) =>
                                    handleDeleteItem(
                                      e,
                                      index,
                                      item.product._id || item.product
                                    )
                                  }
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </header>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default EditImportStock;
