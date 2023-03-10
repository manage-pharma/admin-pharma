import React from 'react'

const demo=() => {
    return (
        <>
            <Toast />

            <section className="content-main" >
                <form onSubmit={handleSubmit}>
                    <div className="content-header">
                        <div className="content-title d-flex" onClick={e => {
                            e.preventDefault()
                            history.push("/products")
                        }}>
                            <h4 className="arrow-breadcrum"><i className="fas fa-arrow-left"></i></h4>
                            <h4>Cập nhật thuốc : <span className="text-danger">{name}</span></h4>
                        </div>
                    </div>

                    <div className="mb-4">
                        <div className="">
                            <div className="card card-custom mb-4">
                                <div className="card-body">
                                    {
                                        loading||loadingUpdate? (<Loading />):
                                            error||errorUpdate||errorUnit||errorUnitCreate||errorUnitDelete||errorManufacturer||errorCountry||errorManufacturerCreate||errorManufacturerDelete||errorCountryCreate||errorCountryDelete||errorAPI||errorAPICreate||errorAPIDelete?
                                                (<Message>{error||errorUnit||errorUnitCreate||errorUnitDelete}</Message>):''
                                    }
                                    {/* //! tên thuốc - tên biệt dược - số đăng ký */}
                                    <div className="mb-4 form-divided-3">
                                        <div>
                                            <label htmlFor="name_drug" className="form-label">
                                                Tên thuốc
                                            </label>
                                            <input
                                                onChange={handleChange}
                                                value={name}
                                                name="name"
                                                type="text"
                                                placeholder="Nhập tên thuốc"
                                                className="form-control"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="brandName" className="form-label">
                                                Tên biệt dược
                                            </label>
                                            <input
                                                onChange={handleChange}
                                                value={brandName}
                                                name="brandName"
                                                type="text"
                                                placeholder="Nhập tên biệt dược"
                                                className="form-control"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="product_regisId" className="form-label">
                                                Số đăng ký
                                            </label>
                                            <input
                                                onChange={handleChange}
                                                value={regisId}
                                                name="regisId"
                                                type="text"
                                                placeholder="Nhập số đăng ký"
                                                className="form-control"
                                                required
                                            />
                                        </div>
                                    </div>
                                    {/* // ! danh mục hàng hóa - danh mục thuốc - thuốc kê đơn  */}
                                    <div className="mb-4 form-divided-3">
                                        <div>
                                            <label htmlFor="product_category" className="form-label">
                                                Nhóm hàng
                                            </label>
                                            <select
                                                value={category}
                                                name="category"
                                                onChange={handleChange}
                                                className="form-control"
                                                required >
                                                <option value=''>Chọn nhóm hàng</option>
                                                {categories?.map((item,index) => (
                                                    <option key={index} value={item._id}>{item.name}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label htmlFor="product_category_drug" className="form-label">
                                                Nhóm thuốc
                                            </label>
                                            <select
                                                value={categoryDrug}
                                                name="categoryDrug"
                                                onChange={handleChange}
                                                className="form-control"
                                                required >
                                                <option value=''>Chọn nhóm thuốc</option>
                                                {categoriesDrug?.map((item,index) => (
                                                    <option key={index} value={item._id}>{item.name}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label htmlFor="product_category_drug" className="form-label">
                                                Thuốc kê đơn
                                            </label>
                                            <select
                                                value={prescription}
                                                name="prescription"
                                                onChange={handleChange}
                                                className="form-control"
                                                required >
                                                <option value='true'>Thuốc kê đơn</option>
                                                <option value='false'>Thuốc không kê đơn</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-4">
                        <div className="card card-custom mb-4">
                            <div className="card-body">
                                {/* // ! (đơn vị tính - giá - quy cách đóng gói) - (hoạt chất -hàm lượng)*/}
                                <div className="mb-4 form-divided-custom-2">
                                    <div className="d-block">
                                        <div className="d-flex align-items-end mb-4">
                                            <div style={{flexGrow: '1'}}>
                                                <label htmlFor="unit" className="form-label">
                                                    Đơn vị tính
                                                </label>
                                                <select
                                                    value={unit}
                                                    name="unit"
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    required >
                                                    <option value=''>Chọn đơn vị tính</option>
                                                    {units?.map((item,index) => (
                                                        <option key={index} value={item}>{item}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div style={{marginLeft: '10px',transform: 'translateY(-3px)'}}>
                                                <button className="circle-btn" onClick={(e) => {
                                                    e.preventDefault();
                                                    setModalShowUnit(true)
                                                }}><i className="fas fa-plus"></i></button>
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="product_price" className="form-label">
                                                Giá thuốc
                                            </label>
                                            <input
                                                name="price"
                                                onChange={handleChange}
                                                value={price}
                                                type="number"
                                                placeholder="100.000"
                                                className="form-control"
                                                id="product_price"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="product_packing" className="form-label">
                                                Quy cách đóng gói
                                            </label>
                                            <input
                                                name="packing"
                                                onChange={handleChange}
                                                value={packing}
                                                type="text"
                                                placeholder="1 Hộp = 10 Vĩ ..."
                                                className="form-control"
                                                id="product_packing"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="d-flex flex-wrap">
                                        <div style={{display: 'flex',gridGap: '30px',width: '-webkit-fill-available'}}>
                                            <div className="d-flex align-items-end w-50 mb-3">
                                                <div style={{flexGrow: '1'}}>
                                                    <label htmlFor="unit" className="form-label">
                                                        Hoạt chất
                                                    </label>
                                                    <select
                                                        value={API}
                                                        name="API"
                                                        onChange={handleChangeAPI}
                                                        className="form-control"
                                                    >
                                                        <option value=''>Chọn hoạt chất</option>
                                                        {API_item?.map((item,index) => (
                                                            <option key={index} value={item}>{item}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div style={{marginLeft: '10px',transform: 'translateY(-3px)'}}>
                                                    <button className="circle-btn" onClick={(e) => {
                                                        e.preventDefault();
                                                        setModalShowActivePharma(true)
                                                    }}><i className="fas fa-plus"></i></button>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-end w-50 mb-3">
                                                <div style={{flexGrow: '1'}}>
                                                    <label htmlFor="product_packing" className="form-label">
                                                        Hàm lượng (g)
                                                    </label>
                                                    <input
                                                        name="content"
                                                        value={content}
                                                        onChange={handleChangeAPI}
                                                        type="number"
                                                        placeholder="Nhập số gam"
                                                        className="form-control"
                                                        id="product_packing"
                                                    />
                                                </div>
                                                <div style={{marginLeft: '10px',transform: 'translateY(-3px)'}}>
                                                    <button className="btn btn-success" onClick={handleAddAPI}><i className="fas fa-plus"></i></button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-100">
                                            <div className="card card-custom">
                                                <header className="card-header bg-aliceblue" style={{height: '170px',overflowY: 'scroll'}}>
                                                    <table className="table">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">Hoạt chất</th>
                                                                <th scope="col">hàm lượng</th>
                                                                <th scope="col">Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {itemDrugStore?.map((item,index) => (
                                                                <tr key={index}>
                                                                    <td>{item.API}</td>
                                                                    <td>{item.content}</td>
                                                                    <td>
                                                                        <button className="dropdown-item text-danger" onClick={(e) => handleDeleteAPI(e,index)}>
                                                                            <i className="fas fa-trash"></i>
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </header>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-4">
                        <div className="card card-custom mb-4">
                            <div className="card-body">
                                {/* // ! nhà sản xuất và nước sản xuất */}
                                <div className="mb-4 form-divided-2">
                                    <div className="d-flex align-items-end">
                                        <div style={{flexGrow: '1'}}>
                                            <label htmlFor="unit" className="form-label">
                                                Nhà sản xuất
                                            </label>
                                            <select
                                                value={manufacturer}
                                                name="manufacturer"
                                                onChange={handleChange}
                                                className="form-control"
                                                required >
                                                <option value=''>Chọn nhà sản xuất</option>
                                                {manufacturers?.map((item,index) => (
                                                    <option key={index} value={item}>{item}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div style={{marginLeft: '10px',transform: 'translateY(-3px)'}}>
                                            <button className="circle-btn" onClick={(e) => {
                                                e.preventDefault();
                                                setModalShowManufacturer(true)
                                            }}><i className="fas fa-plus"></i></button>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-end">
                                        <div style={{flexGrow: '1'}}>
                                            <label htmlFor="unit" className="form-label">
                                                Nước sản xuất
                                            </label>
                                            <select
                                                value={countryOfOrigin}
                                                name="countryOfOrigin"
                                                onChange={handleChange}
                                                className="form-control"
                                                required >
                                                <option value=''>Chọn nước sản xuất</option>
                                                {countries?.map((item,index) => (
                                                    <option key={index} value={item}>{item}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div style={{marginLeft: '10px',transform: 'translateY(-3px)'}}>
                                            <button className="circle-btn" onClick={(e) => {
                                                e.preventDefault();
                                                setModalShowCountry(true)
                                            }}><i className="fas fa-plus"></i></button>
                                        </div>
                                    </div>
                                </div>
                                {/* // ! mô tả - lời chỉ dẫn */}
                                <div className="mb-4 form-divided-2">
                                    <div>
                                        <label className="form-label">Mô tả</label>
                                        <textarea
                                            name="description"
                                            placeholder="Nhập mô tả, công dụng,.."
                                            className="form-control"
                                            rows="4"
                                            required
                                            onChange={handleChange}
                                            value={description}
                                        ></textarea>
                                    </div>
                                    <div>
                                        <label className="form-label">Lời chỉ dẫn</label>
                                        <textarea
                                            name="instruction"
                                            placeholder="Nhập lời chỉ dẫn"
                                            className="form-control"
                                            rows="4"
                                            required
                                            onChange={handleChange}
                                            value={instruction}
                                        ></textarea>
                                    </div>
                                </div>
                                {/* // ! ảnh - cho phép bán */}
                                {/*<div className="mb-4 form-divided-3">
                  <div>
                    <label className="form-label">Hình ảnh</label>
                    <input
                      id="uploadFile"
                      required={image ? false : true}
                      onChange={e => {
                        setData(prev => ({ ...prev, image: null }))
                        setImg(e.target.files[0])
                      }}
                      className="form-control"
                      type="file" />
                    {(image || file) && (
                      <div>
                        <img src={(image ? product.image : URL.createObjectURL(file))}
                          alt="Product"
                          className="mt-3"
                          style={{ width: '250px', marginTop: '5px' }} />
                        <span
                          className="delete-button"
                          onClick={e => {
                            setImg(null)
                            setData(prev => ({ ...prev, image: null }))
                            document.getElementById('uploadFile').value = "";
                          }}
                        >&times;</span>
                      </div>
                    )}
                  </div>
                  <div className="form-check form-switch">
                    <label className="form-label d-flex">Thuốc được phép bán</label>
                    <input
                      style={{
                        transform: 'scale(1.5)',
                        marginTop: '10px',
                        marginLeft: '10px'
                      }}
                      className="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckChecked"
                      checked={data.allowToSell}
                      name="allowToSell"
                      onChange={() => setData(prev => {
                        return {
                          ...prev, allowToSell: !allowToSell
                        }
                      })}
                    />
                  </div>
                </div>*/}
                            </div>
                        </div>
                    </div>
                    {/*  */}
                    <div className="col-md-6 my-4">
                        <div className="input-group mb-3">

                            <div className="custom-file border rounded">



                                <input type="file" className="form-control" id="uploadFile"
                                    onChange={handleUploadInput} multiple accept="image/*" />
                            </div>

                        </div>

                        <div className="row img-up mx-0">
                            {
                                images?.map((img,index) => (
                                    <div key={index} className="file_img my-1">
                                        <img src={img?.name? URL.createObjectURL(img):img}
                                            alt="" className="img-thumbnail rounded" />

                                        <span onClick={() => deleteImage(index)}>X</span>
                                    </div>
                                ))
                            }
                        </div>


                    </div>
                    {/*  */}



                    <div>
                        <button type="submit" className="btn btn-primary mb-4" style={{float: 'right'}}>
                            Lưu lại
                        </button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default demo
