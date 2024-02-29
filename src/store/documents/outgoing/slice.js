import {createSlice} from "@reduxjs/toolkit";


export const outgoingDocumentsSlice = createSlice({
    name: "outgoingDocuments",
    initialState: {error: "", isLoading: false, data: []},
    reducers: {},
})