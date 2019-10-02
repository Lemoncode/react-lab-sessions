import { generatePath } from "react-router";

type NavigationFunction = (id: string) => string;

interface BaseRoutes {
  login: string;
  hotelCollection: string;
  hotelEdit: string | NavigationFunction;
}

interface AppBaseRoutes extends BaseRoutes {
  hotelEdit: string;
}

interface RoutesLinks extends BaseRoutes {
  hotelEdit: NavigationFunction;
}

type RouterSwitchRoutes = AppBaseRoutes;

const appBaseRoutes: AppBaseRoutes = {
  login: "/",
  hotelCollection: "/hotel-collection",
  hotelEdit: "/hotel-edit"
};

export const routerSwitchRoutes: RouterSwitchRoutes = {
  ...appBaseRoutes,
  hotelEdit: `/${appBaseRoutes.hotelEdit}/:id`
};

export const routesLinks: RoutesLinks = {
  ...appBaseRoutes,
  hotelEdit: id => generatePath(routerSwitchRoutes.hotelEdit, { id })
};
