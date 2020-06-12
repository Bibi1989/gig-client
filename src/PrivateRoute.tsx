import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const session = sessionStorage.getItem("gig_token");

  return (
    <Route
      {...rest}
      render={(props) =>
        session ? <Component {...props} /> : <Redirect to='/login' />
      }
    />
  );
};

export default PrivateRoute;
