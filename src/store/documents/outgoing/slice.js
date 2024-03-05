import {createSlice} from "@reduxjs/toolkit";
import {getOutgoingDocuments, uploadFile} from "./action";


export const outgoingDocumentsSlice = createSlice({
    name: "outgoingDocuments",
    initialState: {error: "", isLoading: false, data: []},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getOutgoingDocuments.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(getOutgoingDocuments.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
        builder.addCase(getOutgoingDocuments.pending, (state) => {
            state.isLoading = true;
        })
    }
})

export const createDocumentSlice = createSlice({
    name: "createDocument",
    initialState: {error: "", isLoading: false, attachment: {}},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(uploadFile.fulfilled, (state, action) => {
            state.isLoading = false;
            state.attachment = action.payload;
        });
        builder.addCase(uploadFile.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(uploadFile.rejected, (state, action) => {
           state.isLoading = false;
           state.error = action.payload;
        });
    }
})