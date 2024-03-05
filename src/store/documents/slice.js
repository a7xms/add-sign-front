import {createSlice} from "@reduxjs/toolkit";
import {getDocument} from "./action";


export const viewDocumentSlice = createSlice({
        name: 'viewDocumentSlice',
        initialState: {error: "", isLoading: false, data: {document: {}, signatures: []}},
        reducers: {},
        extraReducers: (builder) => {
            builder.addCase(getDocument.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            });
            builder.addCase(getDocument.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
            builder.addCase(getDocument.pending, (state) => {
                state.isLoading = true;
            });
        }
    }
)