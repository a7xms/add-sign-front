import {configureStore} from "@reduxjs/toolkit";
import {incomingDocumentsSlice} from "./documents/incoming/slice";
import {outgoingDocumentsSlice} from "./documents/outgoing/slice";


export const store = configureStore({
    reducer: {
        incomingDocumentsReducer: incomingDocumentsSlice.reducer,
        outgoingDocumentsReducer: outgoingDocumentsSlice.reducer,
    }
})