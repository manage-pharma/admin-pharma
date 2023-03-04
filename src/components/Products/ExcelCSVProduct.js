import React, { useEffect, useState } from "react";  
import { useDispatch, useSelector } from "react-redux";
import { read, utils, writeFile } from 'xlsx';
import { allProduct, importProduct } from "../../Redux/Actions/ProductActions";
import { PRODUCT_IMPORT_RESET } from "../../Redux/Constants/ProductConstants";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import Toast from "../LoadingError/Toast";
import { toast } from "react-toastify";
import DataTableProduct from "./DataTable";
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
            toast.success("Nhập thành công", ToastObjects);
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
            'Tên thuốc',
            'Số đăng ký',
            'Nhóm hàng',
            'Nhóm thuốc',
            'Đơn vị tính',
            'Quy cách đóng gói',
            'Hoạt chất',
            'Tên biệt dược',
            'Nhà cung cấp',
            'Nước sản xuất',
            'Lời chỉ dẫn',
            'Giá',
            'Thuốc bán',
            'Thuốc kê đơn',
            'Ngày tạo'
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
                            }}>Nhập</label>
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
                            }}>Lưu</button>)
                        }
                    </div>
                    <div>
                        <button onClick={handleExport} className="btn btn-primary float-right">
                            Xuất <i className="fa fa-download"></i>
                        </button>
                    </div>
                </div>

                <div className="card card-custom mb-4 shadow-sm">
                    <header className="card-header bg-white ">
                        <div className="row gx-3 py-3">
                        {
                            loading ? (<Loading />) : error ? (<Message>{error}</Message>) : ''
                        }
                        {
                            data?.length
                            ?
                                <DataTableProduct 
                                    products={data}
                                />
                            :
                                <DataTableProduct 
                                    products={productall}
                                />
                        }
                        </div>
                    </header>
                </div>
            </section>
        </>
    );
};

export default ExcelCSVProductComponent;
