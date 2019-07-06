import * as React from "react"
import { Link } from "react-router-dom";
import {CenteredLayout} from 'layout';
import {routesLinks} from 'core';

export const LoginPage = () =>
    <CenteredLayout>
      <h2>Hello from login Page</h2>
      <Link to={routesLinks.hotelCollection}>Navigate to Hotel Collection</Link>
    </CenteredLayout>
