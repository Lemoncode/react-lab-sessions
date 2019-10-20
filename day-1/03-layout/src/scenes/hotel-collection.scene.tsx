import * as React from 'react';
import { Link } from 'react-router-dom';
import { linkRoutes } from 'core';

export const HotelCollectionScene = () => (
  <>
    <h2>Hello from Hotel Collection Scene</h2>
    <Link to={linkRoutes.login}>Navigate to Login</Link>
  </>
);
