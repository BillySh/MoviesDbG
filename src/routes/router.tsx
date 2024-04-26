import { RouteObject, createBrowserRouter } from "react-router-dom";
import {Home, Popular, TopRated, NowP,ShowP} from "../pages"
import PrivateRouter from "./PrivateRouter";
import {ROUTES} from "./constants";


const routes: RouteObject[] = [
    {
        path: ROUTES.HOME, element: <PrivateRouter/>,
        children: [
            {path: ROUTES.HOME, element:<Home/>},
            {path: ROUTES.POPULAR, element:<Popular/>},
            {path:ROUTES.TOPRATED,element:<TopRated/>},
            {path:ROUTES.NOWP, element:<NowP/>},
            {path:`${ROUTES.SHOW}:id`,element:<ShowP/>}
            

        ]
    },
];

export const router = createBrowserRouter(routes);