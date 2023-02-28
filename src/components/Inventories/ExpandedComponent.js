import React from 'react'
import  moment  from 'moment';

const ExpandedComponent = (props) =>{
    const {data} = props
    return (
        <div className="card-body">
            <div className="row">
                <div className="card card-custom mb-4 shadow-sm">
                    <header className="card-header bg-white ">
                        <div className="row gx-3 py-3">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">STT</th>
                                        <th scope="col">Số lô</th>
                                        <th scope='col'>Số lượng</th>
                                        <th scope="col">HSD</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.data?.products?.map((item, index)=>(
                                        <tr key={index}>
                                            <th scope="row">{ index + 1 }</th>
                                            <td>{ item.lotNumber}</td>
                                            <td>{ moment(item.expDrug).format("DD-MM-YYYY")}</td>
                                            <td>{ item?.count}</td>
                                        </tr> 
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </header>
                </div>
            </div>
        </div> 
    )
}
export default ExpandedComponent