import React, { useEffect, useState } from "react";
import { createExportStock, listExportStock } from '../../Redux/Actions/ExportStockAction';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { EXPORT_STOCK_CREATE_RESET } from '../../Redux/Constants/ExportStockConstant';
import { listUser } from "../../Redux/Actions/UserActions";
import { listProduct } from './../../Redux/Actions/ProductActions';
import { Link, useHistory } from 'react-router-dom';
import Toast from '../LoadingError/Toast';
import  moment  from 'moment';
import renderToast from "../../util/Toast";
const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
  };
const AddExportStock = () => {  
    const dispatch = useDispatch();
    const history = useHistory();
    const createExportStockStatus = useSelector((state)=> state.exportStockCreate)
    const { success } = createExportStockStatus 

    const productList = useSelector((state)=>state.productList)
    const { products } = productList

    const userList  = useSelector((state)=> state.userList)
    const { users } = userList

    const [ isStop , setIsStop ] = useState(false)
    const [itemProducts, setItemProducts] = useState([]);
    const [field, setFieldProduct] = useState({
        countInStock: 0,
        name: '',
        product: '',
        price: 0,
        qty: 0,
    });

    const [data, setData] = useState({
        customer: '',
        phone: '',
        address: '',
        note: '',
        exportedAt: moment(new Date(Date.now())).format('YYYY-MM-DD')
    })
      
    var { 
        customer,
        phone,
        address,
        note,
        exportItems = itemProducts ? [...itemProducts] : [], 
        user,  
        totalPrice, 
        exportedAt
    } = data
    
    const { product, qty, price } = field
    totalPrice= exportItems.reduce((sum, curr) => sum + curr.price * curr.qty, 0)

    const handleChange = e =>{
        e.preventDefault();
        setData(prev => {
          return {
            ...prev, [e.target.name]: e.target.value
          }
        })
    }
    const handleChangeProduct = e =>{
        e.preventDefault();
        setFieldProduct(prev => {
            let a = document.getElementById("select-product");
            let b = a.options[a.selectedIndex]
            let c = b.getAttribute('data-foo')

            let b1 = a.options[a.selectedIndex]
            let c1 = b1.getAttribute('data-countinstock')
            return {
                ...prev,
                name:c,
                countInStock:c1,
                [e.target.name]: e.target.value
              }
        })
    }

    const handleAddProduct = e =>{
        e.preventDefault();
        let flag = false;
        if(parseInt(field.qty) > parseInt(field.countInStock)){
            toast.error(`Quantity is greater than quantity of ${field.name} in stock`, ToastObjects);
            return;
        }                    
        if(!field.product){
            if(!isStop){
                renderToast('The product has not been selected','error', setIsStop, isStop)
            }
            return;
        }
        else if(field.price <= 0 || field.qty <= 0){
            if(!isStop){
                renderToast('Price or Quantity have to greater 0','error', setIsStop, isStop)
            }
            return;
        }
        else{
            exportItems.forEach((item, index)=>{
                if(item.product === field.product){
                    let a = item.qty += parseInt(field.qty)
                    if( parseInt(a) > parseInt(field.countInStock)){
                        flag = true
                        toast.error(`Quantity is greater than quantity of ${field.name} in stock`, ToastObjects);
                        return;
                    }else{
                        flag = true
                        exportItems.splice(index, 1, {...item, qty:  item.qty += parseInt(field.qty)})
                        setItemProducts(exportItems)
                    }
                 }
            })
            if(!flag){
                setItemProducts(prev => 
                    [...prev, {...field, qty: parseInt(qty)}]
                )
            }
        }
    }
    const handleSubmit = e => {
        e.preventDefault();
        dispatch(createExportStock({
           ...data,
           exportItems: exportItems,
           totalPrice : exportItems.reduce((sum, curr) => sum + curr.price * curr.qty, 0)
        }));
    }
    const handleDeleteItem = (e, index) =>{
        e.preventDefault()
        exportItems.splice(index, 1)
        setItemProducts(exportItems)
    }
    
    useEffect(()=>{
        if(success){
            toast.success(`Added successfully`, ToastObjects);
            dispatch({type: EXPORT_STOCK_CREATE_RESET})
            setData({
                customer: '',
                phone: '',
                address: '',
                note: '',
                totalPrice: 0,
                exportedAt: moment(new Date(Date.now())).format('YYYY-MM-DD')
            })
            setFieldProduct({
                countInStock: 0,
                name: '',
                product: '',
                price: 0,
                qty: 0,
            })
            setItemProducts([])
            dispatch(listExportStock())
        }
        dispatch(listUser())
        dispatch(listProduct())
    }, [success, dispatch])

    return (
      <>
        <Toast/>
        <section className="content-main" >
            <form onSubmit={handleSubmit}>
                <div className="content-header">
                    <div className="content-title d-flex" onClick={e=>{
                        e.preventDefault()
                        history.push("/export-stock")
                    }}>
                        <h4 className="arrow-breadcrum"><i className="fas fa-arrow-left"></i></h4>
                        <h3>Add export stock</h3>
                    </div>
                    <div>
                        <button type="submit" className="btn btn-primary">
                            Publish now
                        </button>
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
                                        type='date'
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
                                    required >
                                        <option value=''>Chosse user</option>
                                        {users?.map((item, index)=>(
                                            <option key={index} value={item._id}>{item.name}</option>
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
                                required >
                                    <option value=''>Chosse product</option>
                                    {products?.map((item, index)=>(
                                        <option 
                                            key={index} 
                                            value={item._id} 
                                            data-foo={item.name} 
                                            data-countinstock={item.countInStock}
                                            >{item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4 form-divided-2">
                                <div>
                                    <label className="form-label">Price buy</label>
                                    <input
                                        name="price"
                                        value={price}
                                        type='number'
                                        min="1"
                                        className="form-control"
                                        required
                                        onChange={handleChangeProduct}
                                    ></input>

                                </div>
                                <div>
                                    <label htmlFor="qty" className="form-label">
                                        Quantity
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
                                <button className="btn btn-success" onClick={handleAddProduct}>Add Product</button>
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
                                <th scope="col">Price buy</th>
                                <th scope='col'>Quantity</th>
                                <th scope="col">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                                {itemProducts?.map((item, index)=>(
                                    <tr key={index}>
                                    <th scope="row">{ index + 1 }</th>
                                    <td>{ item.name }</td>
                                    <td>{ item.price}</td>
                                    <td>{ item.qty}</td>
                                    <td>
                                        <div 
                                            className="dropdown">
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
                                                <button className="dropdown-item text-danger" onClick={(e)=>handleDeleteItem(e,index)}>
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                </tr> 
                                ))}
                            </tbody>
                            </table>
                            <div className="mb-6 d-flex justify-content-end">
                                {`Total Price: ${totalPrice}`}
                            </div>
                        </div>
                    </header>
                    </div>
                </div>
            </div>
        </section>
      </>
    );
  }

  export default AddExportStock;