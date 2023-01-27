import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router';
import cookie from 'cookie';
// import AdminDashboard from './containers/AdminDashboard';
import Login from './containers/Login';
import Dashboard from './containers/Dashboard';
import NewUser from './containers/NewUser';
import NewOrganization from './containers/NewOrganization';
import NewProject from './containers/NewProject';
import ProjectDetails from './containers/ProjectDetails';
import UpdateProject from './containers/UpdateProject';

//Todo: Write checkAuth function here
//Todo: Check the cookies for a cookie called "loggedIn"

const checkAuth = () => {
  const cookies = cookie.parse(document.cookie);
  // * Checking cookie object to see if cookies.loggedIn is truthy.
  // console.log(cookies.loggedIn);
  return cookies['loggedIn'] ? true : false;
};

//Todo: Write ProtectedRoute function here
const ProtectedRoute = (props) => {
  //   console.log(props);
  // # Destructure the props object.
  // # Using the rest pattern to add the rest of the props assigned when we call the component.
  // eslint-disable-next-line no-unused-vars
  const { component: Component, ...rest } = props;
  // console.log(rest);
  // # Using Component variable assigned above to render a component if logged in.
  // # If user is not logged in they are pointed back to the login page using the "Navigate" component from react-router.
  // # Also unpacking the rest of the props into the component by using the spread operator.
  return checkAuth() === true ? <Component /> : <Navigate to='/login' />;
};

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<ProtectedRoute component={Dashboard} />} />
      <Route path='/login' element={<Login />} />
      {/* <Route path='/listings' element={<Listings />} /> */}
      <Route
        path='/projects/:id'
        element={<ProtectedRoute component={ProjectDetails} />}
      />
      <Route
        path='/projects/update/:id'
        element={<ProtectedRoute component={UpdateProject} />}
      />
      <Route path='/newUser' element={<NewUser />} />
      <Route
        path='/newOrganization'
        element={<ProtectedRoute component={NewOrganization} />}
      />
      <Route
        path='/newProject'
        element={<ProtectedRoute component={NewProject} />}
      />
      {/* <Route path='/map' element={<Map />} /> */}
    </Routes>
  );
};

export default Router;
