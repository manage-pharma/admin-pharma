import React, { useEffect, useState } from "react";  
import { useDispatch, useSelector } from "react-redux";
import { read, utils, writeFile } from 'xlsx';
import { allProduct, importProduct } from "../../Redux/Actions/ProductActions";
import { PRODUCT_IMPORT_RESET } from "../../Redux/Constants/ProductConstants";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import Toast from "../LoadingError/Toast";
import { toast } from "react-toastify";
import moment from "moment";
const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
  };
const ExcelCSVProductComponent = () => {
    const dispatch = useDispatch()
    const [data, setData] = useState(null);
    const importProducts = useSelector(state=> state.productImport)
    const {loading, error, success} = importProducts
    const productAll = useSelector((state)=> state.productAll)
    const { productall } = productAll
    useEffect(()=>{
        if(success){
            toast.success("Import Successful", ToastObjects);
            dispatch({type: PRODUCT_IMPORT_RESET})
            setData(null)
            dispatch(allProduct())
        }
        else if(!data){
            dispatch(allProduct())
        }
    }, [success, dispatch, data])

    const handleImport = ($event) => {
        const files = $event.target.files;
        if (files.length) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                const wb = read(event.target.result);
                const sheets = wb.SheetNames;

                if (sheets.length) {
                    const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
                    setData(rows)
                }
            }
            reader.readAsArrayBuffer(file);
        }
    }
    const handleSave = (e) =>{
        e.preventDefault();
        dispatch(importProduct(data));
    }
    const handleExport = () => {
        const headings = [[
            'ID',
            'category',
            'name',
            'image',
            'description',
            'rating',
            'numberReviews',
            'price',
            'countInStock',
            'reviews',
            'createdAt',
            'updatedAt',
            'version'
        ]];

        const cloneData = JSON.parse(JSON.stringify(productall))
        cloneData.map(item=>{
            let tmp = item.category.name
            delete item.category.name
            return item.category = tmp
        })
        const wb = utils.book_new();
        const ws = utils.json_to_sheet([]);
        utils.sheet_add_aoa(ws, headings);
        utils.sheet_add_json(ws, cloneData, { origin: 'A2', skipHeader: true });
        utils.book_append_sheet(wb, ws, 'Report');
        writeFile(wb, 'Report.xlsx');
    }

    return (
        <>
            <Toast />
            <section className="content-main">
                <div className="content-header">
                    <div className="d-flex">
                        <label 
                            className="form-label" 
                            style={{
                                marginRight:"10px", 
                                paddingTop:"5px", 
                                fontWeight:"bold"
                            }}>Import</label>
                        <input 
                            type="file" 
                            name="file" 
                            className="form-control" 
                            id="inputGroupFile" 
                            required 
                            onChange={handleImport}
                            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        />
                        {data && (<button 
                            onClick={(e)=>handleSave(e)} 
                            className="btn btn-primary float-right"
                            style={{
                                marginLeft:"10px", 
                                paddingTop:"5px", 
                                fontWeight:"bold"
                            }}>Save</button>)
                        }
                    </div>
                    <div>
                        <button onClick={handleExport} className="btn btn-primary float-right">
                            Export <i className="fa fa-download"></i>
                        </button>
                    </div>
                </div>

                <div className="card card-custom mb-4 shadow-sm">
                    <header className="card-header bg-white ">
                        <div className="row gx-3 py-3">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Id</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Category</th>
                                        <th scope="col">Category Drug</th>
                                        <th scope="col">Unit</th>
                                        <th scope="col">Capacity</th>
                                        <th scope="col">Exp</th>
                                        <th scope="col">Rest Exp</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Stock</th>
                                        <th scope="col">Status</th>
                                        <th scope='col'>Image</th>
                                    </tr>
                                </thead>
                                <tbody> 
                                        {
                                            loading ? (<Loading />) : error ? (<Message>{error}</Message>) : ''
                                        }
                                        {
                                            data?.length
                                            ?
                                            data?.map((item, index) => (
                                                <tr key={index}>
                                                    <th scope="row">{ index + 1 }</th>
                                                    <td>{ item.name }</td>
                                                    <td><span className="badge bg-warning text-dark">{ item?.category?.name }</span></td>
                                                    <td><span className="badge bg-primary text-dark">{ item?.categoryDrug?.name }</span></td>
                                                    <td>{ item.unit}</td>
                                                    <td>{ item.capacity}</td>
                                                    <td>{ moment(item.expDrug).format('DD-MM-YYYY')}</td>
                                                    <td>{`${moment(item.expDrug).diff(moment(Date.now()), "days")} days`}</td>
                                                    <td>{ item.price}</td>
                                                    <td>{ item.countInStock }</td>
                                                    <td>{ item.description}</td>
                                                    { item.statusDrug === true ? 
                                                        <td><span className="badge bg-success text-dark"></span>Stopping</td>   : 
                                                        <td><span className="badge bg-danger text-dark"></span>Using</td>
                                                    }
                                                    <td>
                                                        <img style={{width:"60px", height:"40px"}} src={item.image} alt="ImageProduct" />
                                                    </td>
                                                </tr> 
                                            ))
                                            :
                                            productall?.map((item, index) => (
                                                <tr key={index}>
                                                    <th scope="row">{ index + 1 }</th>
                                                    <td>{ item.name }</td>
                                                    <td><span className="badge bg-warning text-dark">{ item?.category?.name }</span></td>
                                                    <td><span className="badge bg-primary text-white">{ item?.categoryDrug?.name }</span></td>
                                                    <td>{ item.unit}</td>
                                                    <td>{ item.capacity}</td>
                                                    <td>{ moment(item.expDrug).format('DD-MM-YYYY')}</td>
                                                    <td>{`${moment(item.expDrug).diff(moment(Date.now()), "days")} days`}</td>
                                                    <td>{ item.price}</td>
                                                    <td>{ item.countInStock }</td>
                                                    <td>{ item.description}</td>
                                                    { item.statusDrug === true ? 
                                                        <td><span className="badge bg-success text-white">Using</span></td>   : 
                                                        <td><span className="badge bg-danger text-white">Stopped</span></td>
                                                    }
                                                    <td>
                                                        <img style={{width:"60px", height:"40px"}} src={item.image} alt="ImageProduct" />
                                                    </td>
                                                </tr> 
                                            ))
                                        }
                                </tbody>
                            </table>
                        </div>
                    </header>
                </div>
            </section>
        </>
    );
};

export default ExcelCSVProductComponent;
