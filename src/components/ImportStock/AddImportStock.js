import React, { useEffect, useState } from "react";
import { createImportStock, listImportStock } from '../../Redux/Actions/ImportStockAction';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { IMPORT_STOCK_CREATE_RESET } from '../../Redux/Constants/ImportStockConstant';
import { listProvider } from '../../Redux/Actions/ProviderAction';
import { listUser } from "../../Redux/Actions/UserActions";
import { Link } from 'react-router-dom';
import Toast from './../LoadingError/Toast';
import  moment  from 'moment';
import renderToast from "../../util/Toast";
const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
  };
const AddImportStock = () => {  
    const dispatch = useDispatch();

    const createImportStockStatus = useSelector((state)=> state.importStockCreate)
    const { success } = createImportStockStatus

    const providerList = useSelector((state)=>state.providerList)
    const { providers } = providerList

    const productList = useSelector((state)=>state.productList)
    const { products } = productList

    const userList  = useSelector((state)=> state.userList)
    const { users } = userList

    const [ isStop , setIsStop ] = useState(false)
    const [itemProducts, setItemProducts] = useState([]);
    const [field, setFieldProduct] = useState({
        name: '',
        product: '',
        price: 0,
        qty: 0,
    });

    const [data, setData] = useState({
        status: false,
        importedAt: moment(new Date(Date.now())).format('YYYY-MM-DD')
    })
      
    var { 
        provider, 
        importItems = itemProducts ? [...itemProducts] : [], 
        user,  
        totalPrice, 
        status, 
        importedAt
    } = data
    
    const { product, qty, price } = field
    totalPrice= importItems.reduce((sum, curr) => sum + curr.price * curr.qty, 0)

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
            return {
                ...prev,
                name:c, 
                [e.target.name]: e.target.value
              }
        })
    }

    const handleAddProduct = e =>{
        e.preventDefault();
        let flag = false;
        
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
            importItems.forEach((item, index)=>{
                if(item.product === field.product){
                    flag = true
                    importItems.splice(index, 1, {...item, qty:  item.qty += parseInt(field.qty)})
                    setItemProducts(importItems)
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
        dispatch(createImportStock({
           ...data,
           importItems: importItems,
           totalPrice : importItems.reduce((sum, curr) => sum + curr.price * curr.qty, 0)
        }));
    }
    const handleDeleteItem = (e, index) =>{
        e.preventDefault()
        importItems.splice(index, 1)
        setItemProducts(importItems)
    }
    
    useEffect(()=>{
        if(success){
            toast.success(`Added successfully`, ToastObjects);
            dispatch({type: IMPORT_STOCK_CREATE_RESET})
            setData({
                totalPrice: 0,
                status: false,
                importedAt: moment(new Date(Date.now())).format('YYYY-MM-DD')
            })
            setFieldProduct({
                name: '',
                product: '',
                price: 0,
                qty: 0,
            })
            setItemProducts([])
            dispatch(listImportStock())
        }
        dispatch(listProvider())
        dispatch(listUser())
    }, [success, dispatch])

    return (
      <>
        <Toast/>
        <section className="content-main" >
            <form onSubmit={handleSubmit}>
                <div className="content-header">
                    <h2 className="content-title">Import stock</h2>
                    <div>
                    <button type="submit" className="btn btn-primary">
                        Publish now
                    </button>
                    </div>
                </div>
                <div className="mb-4">
                    <div className="card card-custom mb-4 shadow-sm">
                        <div className="card-body">
                            <div className="mb-4">
                                <label htmlFor="name_drug" className="form-label">
                                    Provider
                                </label>
                                <select
                                value={provider}
                                name="provider"
                                onChange={handleChange}
                                className="form-control"
                                required >
                                    <option value=''>Chosse Provider</option>
                                    {providers?.map((item, index)=>(
                                    <option key={index} value={item._id}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4 form-divided-3">
                                <div>
                                    <label className="form-label">Imported At</label>
                                    <input
                                        id="datePicker"
                                        name="importedAt"
                                        className="form-control"
                                        type='date'
                                        required
                                        onChange={handleChange}
                                        value={importedAt}
                                    ></input>
                                </div>
                                <div>
                                    <label htmlFor="product_category_drug" className="form-label">
                                        Status
                                    </label>
                                    <select
                                    value={status}
                                    name="status"
                                    onChange={handleChange}
                                    className="form-control"
                                    >
                                        <option value={false}>Incompletd</option>
                                        <option value={true}>Completed</option>
                                    </select>
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
                                        <option key={index} value={item._id} data-foo={item.name}>{item.name}</option>
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

  export default AddImportStock;