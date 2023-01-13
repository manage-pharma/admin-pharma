import React, { useEffect } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { useSelector, useDispatch } from 'react-redux';
import { categoriesProduct } from "../../Redux/Actions/ProductActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import { useHistory } from 'react-router-dom';
import moment from "moment";
const DetailCategories = (props) => {
  const {categoryId} = props;
  const dispatch = useDispatch()
  const history = useHistory();
  const productCategory = useSelector(state => state.productCategories)
  const {loading, error, product} = productCategory;

  useEffect(()=>{
    dispatch(categoriesProduct(categoryId));
  },[dispatch, categoryId])


  createTheme("solarized", {
    text: {
      primary: "#268bd2",
      secondary: "#2aa198"
    },
    background: {
      default: "#002b36"
    },
    context: {
      background: "#cb4b16",
      text: "#FFFFFF"
    },
    divider: {
      default: "#073642"
    },
    action: {
      button: "rgba(0,0,0,.54)",
      hover: "rgba(0,0,0,.08)",
      disabled: "rgba(0,0,0,.12)"
    }
  });
  const columns = [
    {
      name: "ID",
      selector: (row, index) => <bold>{index+1}</bold>,
      sortable: true,
      reorder: true
    },
    {
      name: "NAME",
      selector: (row) => row.name,
      sortable: true,
      reorder: true
    },{
      name: "IMAGE",
      selector: (row) => <img className="mt-1 w-50 h-50" src={row.image} alt="ImageCategory" />,
    },
    {
      name: "DESCRIPTION",
      selector: (row) => row.description,
      sortable: true,
      reorder: true
    },
    // {
    //   name: "CATEGORY",
    //   selector: (row) => row.category.name,
    //   sortable: true
    // },
    {
      name: "PRICE ($)",
      selector: (row) => row.price,
      sortable: true,
      reorder: true
    },
    {
      name: "STOCK",
      selector: (row) => row.countInStock,
      sortable: true,
      reorder: true
    },
    {
      name: "UNIT",
      selector: (row) => row.unit,
      sortable: true,
      reorder: true
    },
    {
      name: "CAPACITY",
      selector: (row) => row.capacity,
      sortable: true,
      reorder: true
    },
    {
      name: "EXP",
      selector: (row) => moment(row.expDrug).format("DD-MM-YYYY"),
      sortable: true,
      reorder: true
    },
    {
      name: "REST EXP",
      selector: (row) => (moment(row.expDrug)).diff(moment(Date.now()), "days"),
      sortable: true,
      reorder: true
    },
    {
      name: "STATUS",
      selector: (row) => row.statusDrug === true ? "Using" : "Stopped",
      sortable: true,
      reorder: true
    }
  ];
  const handleRowClicked = (row) => {
    history.push(`/product/${row._id}/edit`)
  };
  const paginationComponentOptions = {
  selectAllRowsItem: true,
  selectAllRowsItemText: "ALL"
};
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Categories</h2>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="row">
          {loading ? (<Loading />) : error ? (<Message>{error}</Message>) : ''}
          <DataTable
              title={`Products of the ${product[0]?.category?.name}`}
              // theme="solarized"
              columns={columns}
              data={product}
              defaultSortFieldId
              pagination
              onRowClicked={handleRowClicked}
              paginationComponentOptions={paginationComponentOptions}
              highlightOnHover
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailCategories;
