import {configureStore} from "@reduxjs/toolkit";
import {incomingDocumentsSlice} from "./documents/incoming/slice";
import {outgoingDocumentsSlice} from "./documents/outgoing/slice";
import {authSlice} from "./auth/slice";
import {loginSlice} from "./auth/loginSlice";


export const store = configureStore({
    reducer: {
        incomingDocumentsReducer: incomingDocumentsSlice.reducer,
        outgoingDocumentsReducer: outgoingDocumentsSlice.reducer,
        authReducer: authSlice.reducer,
        loginReducer: loginSlice.reducer,
    }
})