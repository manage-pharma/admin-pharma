import React from 'react'
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { PERMISSIONS } from './RolesContanst';

export const withAuthorization = (WrappedComponent, requiredPermission, roleAdmin = false) => {
  const AuthorizedComponent = (props) => {
    const userLogin=useSelector(state => state.userLogin)
    const {userInfo}=userLogin;
    const userRole = userInfo?.role;
    const hasPermission = PERMISSIONS[userRole][requiredPermission] || '';
    const hasPermissionDefault = roleAdmin && userRole === "isAdmin"

    if (userInfo && ( hasPermission || hasPermissionDefault)  ) {
        return <WrappedComponent {...props} />;
    }
    return <Redirect to="/login" />;
    
  };

  return AuthorizedComponent;
};