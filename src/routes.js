import Home from "./Home";
import SignupPage from "./SignUp";
import IncomingDocuments from "./Incoming";
import OutgoingDocuments from "./Outgouing";
import {createBrowserRouter} from "react-router-dom";

const routes =[
    {
        path: '/',
        element: <Home/>
    },
    {
        path: '/signup',
        element: <SignupPage/>
    },
    {
        path: '/incoming',
        element: <IncomingDocuments/>
    },
    {
        path: '/outgoing',
        element: <OutgoingDocuments/>
    }
];

export const router = createBrowserRouter(routes);