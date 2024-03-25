import {createSlice} from "@reduxjs/toolkit";
import {getOutgoingDocuments, getSharedDocument, shareDocument, uploadFile} from "./action";


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

export const shareDocumentSlice = createSlice({
    name: "shareDocumentSlice",
    initialState: {error: "", isLoading: false, link: {linkId: ""}, data: {document: {}, signatures: []}},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(shareDocument.fulfilled, (state, action) => {
            state.isLoading = false;
            state.link = action.payload;
        });
        builder.addCase(shareDocument.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
        builder.addCase(shareDocument.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getSharedDocument.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(getSharedDocument.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
        builder.addCase(getSharedDocument.pending, (state) => {
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