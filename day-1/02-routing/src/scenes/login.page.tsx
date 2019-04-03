import * as React from "react"
import { Link } from "react-router-dom";
import {SingleViewLayout} from '../layout';

export const LoginPage = () =>
    <SingleViewLayout>
      <h2>Hello from login Page</h2>
      <Link to="/hotel-collection">Navigate to Hotel Collection</Link>
    </SingleViewLayout>
