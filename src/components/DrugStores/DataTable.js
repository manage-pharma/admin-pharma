// import moment from 'moment/moment';
import DataTable from "react-data-table-component";
import {Link,useHistory} from "react-router-dom";
import React from "react";
import CustomLoader from './../../util/LoadingTable';
const DataTableProduct=(props) => {
    const {drugstores, loading, loadingDelete} = props
    const history=useHistory()

    const CustomMaterialMenu=(props) => {
        let {row}=props
        return (
            <div className="dropdown">
                <Link
                    to="#"
                    data-bs-toggle="dropdown"
                    className="btn btn-light"
                >
                    <i className="fas fa-ellipsis-h"></i>
                </Link>
                <div className="dropdown-menu">
                    <button className="dropdown-item" onClick={(e) => {
                        e.stopPropagation()
                        let id=row._id
                        history.push(`/drugstore/${id}`)
                    }}>
                        Edit info
                    </button>
                </div>
            </div>
        )
    }

    const columns=[

        {
            name: "Tên thuốc",
            selector: (row) => row.product.name,
            sortable: true,
            reorder: true,
            minWidth: "180px",
        },
        {
            name: "Hình ảnh",
            selector: (row) => <img className="mt-1 w-80 h-80" src={row.product.image?.slice(0,0+1)[0]} alt="ImageCategory" />,
        },
        {
            name: "Số lượng",
            selector: (row) => row.countInStock,
            sortable: true,
            minWidth: "180px",
        },
        {
            name: "Giá",
            selector: (row) => row?.product.price,
            sortable: true,
            minWidth: "180px",
        },
        {
            name: "Giảm giá",
            selector: (row) => row.discount,
            sortable: true,
            minWidth: "180px",
        },
        {
            name: "Hiển thị",
            selector: (row) => row.isActive?
                <span className="badge bg-success text-white p-2" style={{minWidth: '45px'}}>Có</span>:
                <span className="badge bg-danger text-white p-2" >Không</span>,
            sortable: true,
            reorder: true,

            minWidth: "150px",
        },


        {
            name: "Nguồn gốc",
            selector: (row) => row.product.countryOfOrigin,
            sortable: true,
            reorder: true,
            minWidth: "130px",
        },
        {
            name: "Đánh giá",
            selector: (row) => row.product.rating,
            sortable: true,
            minWidth: "180px",
        },

        {
            name: "Hành động",
            cell: row => <CustomMaterialMenu size="small" row={row} />,
            allowOverflow: true,
            button: true,
            width: '100px',
        },
    ];

    const paginationComponentOptions={
        selectAllRowsItem: true,
        selectAllRowsItemText: "ALL"
    };

    // const conditionalRowStyles = [
    //     {
    //         when: row => (moment(row.expDrug)).diff(moment(Date.now()), "days") > 180,
    //         style: {
    //             backgroundColor: 'rgba(63, 195, 128, 0.9)',
    //             color: 'white',
    //             '&:hover': {
    //                 cursor: 'pointer',
    //             },
    //         },
    //     },
    //     {
    //         when: row => (moment(row.expDrug)).diff(moment(Date.now()), "days") >= 90 && (moment(row.expDrug)).diff(moment(Date.now()), "days") < 180,
    //         style: {
    //             backgroundColor: 'rgba(248, 148, 6, 0.9)',
    //             color: 'white',
    //             '&:hover': {
    //                 cursor: 'pointer',
    //             },
    //         },
    //     },
    //     {
    //         when: row => (moment(row.expDrug)).diff(moment(Date.now()), "days") < 90,
    //         style: {
    //             backgroundColor: 'rgba(242, 38, 19, 0.9)',
    //             color: 'white',
    //             '&:hover': {
    //                 cursor: 'not-allowed',
    //             },
    //         },
    //     },
    // ];

    const handleRowClicked=(row) => {
        history.push(`/drugstore/${row._id}`)
    };

    const customStyles={
        rows: {
            highlightOnHoverStyle: {
                backgroundColor: 'rgb(230, 244, 244)',
                borderBottomColor: '#FFFFFF',
                // borderRadius: '25px',
                outline: '1px solid #FFFFFF',
            },
        },
        header: {
            style: {
                minHeight: '56px',
            },
        },
        headRow: {
            style: {
                fontSize: '14px',
                borderTopStyle: 'solid',
                borderTopWidth: '1px',
                borderTopColor: 'grey',
            },
        },
        headCells: {
            style: {
                '&:not(:last-of-type)': {
                    borderRightStyle: 'solid',
                    borderRightWidth: '1px',
                    borderRightColor: 'grey',
                },
            },
        },
        cells: {
            style: {
                '&:not(:last-of-type)': {
                    borderRightStyle: 'solid',
                    borderRightWidth: '1px',
                    borderRightColor: 'grey',
                },
            },
        },
    };


    return (
        <>

            <DataTable
                // theme="solarized"
                columns={columns}
                data={drugstores}
                customStyles={customStyles}
                defaultSortFieldId
                pagination
                onRowClicked={handleRowClicked}
                // conditionalRowStyles={dessert ? conditionalRowStyles : ''}
                paginationComponentOptions={paginationComponentOptions}
                progressPending={loading||loadingDelete}
                progressComponent={<CustomLoader />}
                highlightOnHover
                pointerOnHover
            />
        </>

    )
}
export default DataTableProduct;