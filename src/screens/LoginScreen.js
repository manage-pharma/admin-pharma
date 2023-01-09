import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom'
import { login } from "../Redux/Actions/UserActions";
import Message from '../components/LoadingError/Error';
import Loading from '../components/LoadingError/Loading';
import Toast from '../components/LoadingError/Toast';
const Login = () => {
  window.scrollTo(0,0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = useSelector(state => state.userLogin);
  const {error, loading, userInfo} = userLogin;

  useEffect(() =>{
    if(userInfo){
      history.push('/')
    }
  }, [userInfo, history])
  
  const handleSubmit =  (e) =>{
    e.preventDefault();
    dispatch(login(email, password));
  }
  return (
    <>
    <Toast/>
      <div
        className="card shadow mx-auto"
        style={{ maxWidth: "380px", marginTop: "100px" }}
      >
        <div className="card-body">
          {
            error && (
              <Message variant="alert-danger">
                  {
                    error
                  }
              </Message>
            )
          }
          {
            loading && <Loading />
          }
          <h4 className="card-title mb-4 text-center">Sign in</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input onChange={e => setEmail(e.target.value)}
                className="form-control"
                placeholder="Email"
                type="email"
                value={email}
              />
            </div>
            <div className="mb-3">
              <input onChange={e => setPassword(e.target.value)}
                className="form-control"
                placeholder="Password"
                type="password"
                value={password}
              />
            </div>

            <div className="mb-4">
              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
