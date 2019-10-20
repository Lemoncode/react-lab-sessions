import * as React from 'react';
import { Link } from 'react-router-dom';
import { CenteredLayout } from 'layouts';
import { linkRoutes } from 'core';

export const LoginScene = () => (
  <CenteredLayout>
    <h2>Hello from login Scene</h2>
    <Link to={linkRoutes.hotelCollection}>Navigate to Hotel Collection</Link>
  </CenteredLayout>
);
