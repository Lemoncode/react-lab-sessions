import * as React from 'react';
import { Link } from 'react-router-dom';
import { linkRoutes } from 'core';
import { AppLayout } from 'layouts';
import { HotelCollectionContainer } from 'pods/hotel-collection';

export const HotelCollectionScene = () => (
  <AppLayout>
    <HotelCollectionContainer />
  </AppLayout>
);
