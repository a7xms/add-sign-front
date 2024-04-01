import Home from "./Home";
import SignupPage from "./components/auth/SignUp";
import IncomingDocuments from "./Incoming";
import OutgoingDocuments from "./Outgouing";
import {createBrowserRouter} from "react-router-dom";
import RegistrationSuccess from "./components/auth/RegistrationSuccess";
import SignInPage from "./components/auth/SignIn";
import CreateDocumentPage from "./pages/CreateDocument";
import ViewDocumentPage from "./pages/ViewDocumentPage";
import SharedDocumentPage from "./pages/SharedDocumentPage";
import UserHome from "./UserHome";

const routes =[
    {
        path: '/',
        element: <Home/>
    },
    {
        path: '/home',
        element: <UserHome/>
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
    },
    {
        path: "/new/doc",
        element: <CreateDocumentPage/>
    },
    {
        path: "view/doc/:id",
        element: <ViewDocumentPage/>
    },
    {
        path: "view/shared/:link",
        element: <SharedDocumentPage/>
    }
];

export const router = createBrowserRouter(routes);