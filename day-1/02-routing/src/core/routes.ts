import { generatePath } from "react-router";

interface BaseRoutes {
  login: string;
  hotelCollection: string;
}

const appBaseRoutes: BaseRoutes = {
  login: '/',
  hotelCollection: '/hotel-collection',
}

interface RouterSwitchRoutes extends BaseRoutes {
  hotelEdit: string;
}   

export const routerSwitchRoutes: RouterSwitchRoutes = {
  ...appBaseRoutes,
  hotelEdit: `hotel-edit/:id`,
}

interface RouterLinks extends BaseRoutes {
  hotelEdit: (id:number) => string; 
}

export const routerLinks: RouterLinks = {
  ...appBaseRoutes,
  hotelEdit: (id) => generatePath(routerSwitchRoutes.hotelEdit, {id})
}
