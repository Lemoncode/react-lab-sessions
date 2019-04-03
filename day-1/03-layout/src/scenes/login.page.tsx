import * as React from "react";
import { Link } from "react-router-dom";
import { SingleViewLayout } from "layout";
import { routesLinks } from "core";
import { LoginContainer } from "pods/login";

export const LoginPage = () => (
  <SingleViewLayout>
    <LoginContainer />
  </SingleViewLayout>
);
