
import React from "react";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import { Link, useHistory } from "react-router-dom";
import DataTable from "react-data-table-component";

const CategoriesTable = (props) => {
  const {categoryList} = props
  const history = useHistory()
  const {loading, error, categories} = categoryList

  const columns = [
    {
        name: "STT",
        selector: (row, index) => <bold>{index+1}</bold>,
        reorder: true,
        width: '60px'

    },
    {
        name: "NAME",
        selector: (row) => row.name,
        sortable: true,
        reorder: true,
        grow: 3
    },
    {
        name: "	DESCRIPTION",
        selector: (row) => row.description,
        sortable: true,
        reorder: true,
        grow: 2
    },
    {
        name: "IMAGE",
        selector: (row) => <img className="mt-1 w-50 h-50" src={row.image} alt="ImageCategory" />,
    },
    {
      name: "ACTIVE",
      selector: (rows) => rows.isActive === true ? 
          (<input className="form-check-input"  type="checkbox" defaultChecked={rows.isActive}/>) : 
          (<input className="form-check-input"  type="checkbox" />),
      sortable: true,
      reorder: true,
      sortFunction: (categories) => {
          return [categories].map((a, b) => {
            const fieldA = a.isActive;
            const fieldB = b.isActive;
            let comparison = 0;
        
            if (fieldA === fieldB) {
              comparison = 0;
            } else if (fieldA === true) {
              comparison = 1;
            } else {
              comparison = -1;
            }
        
            return comparison
          });
      },
      grow: 1
    },
    {   name: "ACTION",
        cell: (row) =>{
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
                  <button className="dropdown-item" onClick={(e)=>{
                    e.preventDefault();
                    props.parentCallbackEdit(row)
                  }}>
                    Edit info
                  </button>
                  <button className="dropdown-item text-danger" onClick={(e)=>{
                    e.preventDefault()
                    props.parentModal(true)
                    props.parentCallbackDelete(row)
                  }}>
                    Delete
                  </button>
                </div>
            </div>
          )
        },
        allowOverflow: true,
        button: true,
        width: '100px',
    },
  ];


  const handleRowClicked = (row) => {
    history.push(`/category/${row._id}`)
  };

  const paginationComponentOptions = {
    selectAllRowsItem: true,
    selectAllRowsItemText: "ALL"
  };

  const customStyles = {
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
            borderTopColor:'grey',
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
    <div className="col-md-12 col-lg-8">
      {
        loading ? (<Loading />) : error ? (<Message>{error}</Message>) : ''
      }
      {categories ?
        <DataTable
          // theme="solarized"
          columns={columns}
          data={categories}
          customStyles={customStyles}
          defaultSortFieldId
          pagination
          onRowClicked={handleRowClicked}
          paginationComponentOptions={paginationComponentOptions}
          highlightOnHover
          pointerOnHover
        /> : <div>There is no data</div>
      }
    </div>
  );
};

export default CategoriesTable;


                      // var name = document.getElementById("itemName")
                      // var description = document.getElementById("itemDescription")
                      // var table =  document.getElementById("table")
                      // table.rows[index+1].setAttribute("contentEditable", true)
                      // // var row = table.rows[index+1];
                      // for(var i = 0; i <= table.rows.length; i++ ){
                      //   console.log(i)
                      //   if(i === index){
                      //     let td= table.rows[i+1].getElementsByTagName("td");
                      //     td[2].setAttribute("contentEditable", true)
                      //     td[3].setAttribute("contentEditable", true)
                      //   }
                      // }