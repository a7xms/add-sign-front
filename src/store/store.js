import {configureStore} from "@reduxjs/toolkit";
import {incomingDocumentsSlice} from "./documents/incoming/slice";
import {outgoingDocumentsSlice} from "./documents/outgoing/slice";
import {authSlice} from "./auth/slice";


export const store = configureStore({
    reducer: {
        incomingDocumentsReducer: incomingDocumentsSlice.reducer,
        outgoingDocumentsReducer: outgoingDocumentsSlice.reducer,
        authReducer: authSlice.reducer,
    }
})