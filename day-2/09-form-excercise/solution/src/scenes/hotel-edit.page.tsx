import * as React from "react";
import { Link } from "react-router-dom";
import { routesLinks } from "core";
import { AppLayout } from "layout";
import { HotelEditContainer } from "pods/hotel-edit";

export const HotelEditPage = () => (
  <AppLayout>   
    <HotelEditContainer/>
  </AppLayout>
);
