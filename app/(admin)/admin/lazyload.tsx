import { lazy } from "react";

const Orders = lazy(() => import("./orders/page"));
const Products = lazy(() => import("./products/page"));
const Users = lazy(() => import("./users/page"));
const Collections = lazy(() => import("./collections/page"));
const HomePage = lazy(() => import("./page"));
const NotFound = lazy(() => import("./notfound/page"));
const LoadingPage = lazy(() => import("./loading/page"));

export {
    Orders,
    Products,
    Users,
    Collections,
    HomePage,
    NotFound,
    LoadingPage
};