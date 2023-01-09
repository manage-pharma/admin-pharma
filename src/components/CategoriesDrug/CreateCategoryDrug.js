import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCategoryDrug, updateCategoryDrug } from "../../Redux/Actions/CategoryDrugAction";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";

const CreateCategoryDrug = (props) => {
  const {valueEdit} = props
  const categoryId = valueEdit._id
  const dispatch = useDispatch();
  const [data, setData] = useState({name: '', description: '', image: '', isActive: false})
  const categoryCreate = useSelector(state => state.categoryDrugCreate);
  const { loading, error, categoryDrug } = categoryCreate;

  const categoryUpdate = useSelector(state => state.categoryDrugUpdate);
  const { categoryDrug: categoryU } = categoryUpdate;
  
  const handleChange = e => {
    setData(prev => {
      return {
        ...prev, [e.target.name] : e.target.value
      }
    })
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    dispatch(createCategoryDrug({ ...data }));
    setData({
      name: '',
      description: '',
      isActive: false
    })
  }

  const hanldeEdit = async(e) => {
    e.preventDefault();
    dispatch(updateCategoryDrug({ ...data, categoryId }));
    setData({
      name: '',
      description: '',
      isActive: false
    })
    props.parentCallbackUpdate(categoryU)
  }
  useEffect(()=>{
    console.log(valueEdit.isActive)
    if(valueEdit){
      setData({
        name: valueEdit.name,
        description: valueEdit.description,
        isActive: valueEdit.isActive
      })
    }
    else{
      setData({
        name: '',
        description: '',
        isActive: false
      })
    }
    if(categoryDrug){
      props.parentCallbackCreate(categoryDrug)
    }
  },[categoryDrug, valueEdit, props])

  const { name, description, isActive } = data;
  return (
    <div className="col-md-12 col-lg-4">
      {
        loading ? (<Loading />) : error ? (<Message>{error}</Message>) : ''
      }
      <form>
        <div className="mb-4">
          <label htmlFor="product_name" className="form-label">
            Name
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="form-control py-3"
            id="category_name"
            required
            value={name}
            name="name"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="form-label">Description</label>
          <textarea
            placeholder="Type here"
            className="form-control"
            rows="4"
            required
            value={description}
            name="description"
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="form-label">{`Active  `}</label>
          <input
            type = 'checkbox'
            checked={isActive}
            name="isActive"
            className="form-check-input" 
            onChange={() => setData(prev => {
              return {
                ...prev, isActive :!isActive
              }
            })}
            />
        </div>
        <div className="d-grid">
          {
            valueEdit ? (
              <button className="btn btn-warning py-3" onClick={hanldeEdit}>Update category</button>
            ): 
            (
              <button className="btn btn-primary py-3" onClick={handleSubmit}>Create category</button>
            )
          }
        </div>
      </form>
    </div>
  );
};

export default CreateCategoryDrug;
