import {configureStore} from "@reduxjs/toolkit";
import {incomingDocumentsSlice} from "./documents/incoming/slice";
import {createDocumentSlice, outgoingDocumentsSlice, shareDocumentSlice} from "./documents/outgoing/slice";
import {authSlice} from "./auth/slice";
import {loginSlice} from "./auth/loginSlice";
import {viewDocumentSlice} from "./documents/slice";


export const store = configureStore({
    reducer: {
        incomingDocumentsReducer: incomingDocumentsSlice.reducer,
        outgoingDocumentsReducer: outgoingDocumentsSlice.reducer,
        authReducer: authSlice.reducer,
        loginReducer: loginSlice.reducer,
        createDocumentReducer: createDocumentSlice.reducer,
        viewDocumentReducer: viewDocumentSlice.reducer,
        shareDocumentReducer: shareDocumentSlice.reducer,
    }
})