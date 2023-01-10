
import React from "react";
import { Link, useHistory } from "react-router-dom";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
const CategoriesTable = (props) => {
  const {categoryList} = props
  const history = useHistory();

  const {loading, error, categories} = categoryList
  return (
    <div className="col-md-12 col-lg-8">
      <table id="table" className="table">
        <thead>
          <tr>
            <th>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" />
              </div>
            </th>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Image</th>
            <th>Active</th>
            <th className="text-end">Action</th>
          </tr>
        </thead>
        {/* Table Data */}
        {
          loading ? (<Loading />) : error ? (<Message>{error}</Message>) : ''
        }
        <tbody>
        {categories?.map((item, index)=>(
          <tr key={index} style={{cursor:'pointer'}} onClick={(e)=>{
            history.push(`/category/${item._id}`)
          }}>
            <td>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" />
              </div>
            </td>
            <td>{index+1}</td>
            <td>
              <b>{item.name}</b>
            </td>
            <td>{item.description}</td>
            <td>
              <img style={{width:"60px", height:"40px"}} src={item.image} alt="image" />
            </td>
            <td>
              <input className="form-check-input"  type="checkbox" defaultChecked={item.isActive} />
            </td>
            <td className="text-end">
              <div 
                onClick={e=>{e.stopPropagation()}} 
                className="dropdown">
                <Link
                  to="#"
                  data-bs-toggle="dropdown"
                  className="btn btn-light"
                >
                  <i className="fas fa-ellipsis-h"></i>
                </Link>
                <div className="dropdown-menu">
                  <button className="dropdown-item" onClick={(e)=>{
                    e.stopPropagation()
                    props.parentCallbackEdit(item)
                  }}>
                    Edit info
                  </button>
                  <button className="dropdown-item text-danger" onClick={(e)=>{
                    e.stopPropagation()
                    props.parentModal(true)
                    props.parentCallbackDelete(item)
                  }}>
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