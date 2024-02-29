import {createAsyncThunk} from "@reduxjs/toolkit";

const getOutgoingDocuments = createAsyncThunk(
    'documents/outgoing',
    async () => {
        return [];
    }
);

