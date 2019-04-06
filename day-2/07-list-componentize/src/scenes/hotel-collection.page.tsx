import * as React from "react";
import { Link } from "react-router-dom";
import { routesLinks } from "core";
import { AppLayout } from "layout";
import { HotelCollectionContainer } from "pods/hotel-collection";

export const HotelCollectionPage = () => (
  <AppLayout>
    <HotelCollectionContainer />
  </AppLayout>
);
