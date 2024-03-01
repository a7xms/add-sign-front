import Home from "./Home";
import SignupPage from "./components/auth/SignUp";
import IncomingDocuments from "./Incoming";
import OutgoingDocuments from "./Outgouing";
import {createBrowserRouter} from "react-router-dom";
import RegistrationSuccess from "./components/auth/RegistrationSuccess";
import SignInPage from "./components/auth/SignIn";

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
    },
    {
        path: '/registrationSuccess',
        element: <RegistrationSuccess/>
    },
    {
        path: '/signin',
        element: <SignInPage/>
    }
];

export const router = createBrowserRouter(routes);