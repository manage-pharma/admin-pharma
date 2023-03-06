import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { listUser, singleUser } from "../../Redux/Actions/UserActions";
import Loading from '../LoadingError/Loading';
import Message from '../LoadingError/Error';
import AddUser from "./AddUserModal";
const UserComponent = () => {
  const dispatch = useDispatch();
  const userList = useSelector(state => state.userList);
  const { loading, error, users } = userList 
  const [show, setShow] = useState(false);
  const handleAdd = (e) =>{
    setShow(true)
  }
  useEffect(() => {
    dispatch((listUser()));
  }, [dispatch])

  return (
    <>
    <AddUser show={show} setShow={setShow}/>
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Danh sách người dùng</h2>
        <div>
          {/* <Link to="#" className="btn btn-primary">
            <i className="material-icons md-plus"></i> Create new
          </Link> */}
            <button onClick={handleAdd} className="btn btn-primary">
              Tạo mới
            </button>
        </div>
      </div>

      <div className="card card-custom mb-4">
        <header className="card-header">
          <div className="row gx-3">
            <div className="col-lg-4 col-md-6 me-auto">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="form-control"
              />
            </div>
          </div>
        </header>

        {/* Card */}
        <div className="card-body">
          {
            loading ? (<Loading />) : error ? (<Message variant="alert-danger" >{error}</Message>) : (
              <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
                {
                  users.map((user, index) => (
                    <div className="col" key={index}>
                      <div className="card card-user shadow-sm">
                        <div className="card-header">
                          <div className="user-effect" onClick={e=>{
                            e.preventDefault();
                            dispatch(singleUser(user._id))
                            setShow(true)
                          }}><i className="far fa-edit"></i></div>
                          <img
                            className="img-md img-avatar"
                            src="images/favicon.png"
                            alt="User pic"
                          />
                        </div>
                        <div className="card-body">
                          <h5 className="card-title mt-5">{user.name}</h5>
                          <div className="card-text text-muted">
                            {
                              user.isAdmin ? (
                                <p className="m-0 badge bg-danger" style={{fontSize: '16px'}}>Admin</p>
                              )
                              :
                              (
                                <p className="m-0 badge bg-primary text-wrap" style={{width: '4rem', fontSize: '16px'}}>User</p>
                              )
                            }
                            <h6 className="mt-2 card-title">{user.phone}</h6>
                            <p>
                              <a href={`mailto:${user.email}`}>{user.email}</a>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            )
          }


        </div>
      </div>
    </section>
    </>

  );
};

export default UserComponent;
