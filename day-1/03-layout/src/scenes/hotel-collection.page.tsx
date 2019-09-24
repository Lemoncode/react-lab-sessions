import * as React from "react";
import { Link } from "react-router-dom";
import { routesLinks } from "core";

export const HotelCollectionPage = () => (
  <>
    <h2>Hello from Hotel Collection Page</h2>
    <Link to={routesLinks.login}>Navigate to Login</Link>
  </>
);
