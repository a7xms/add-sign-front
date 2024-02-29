import {createAsyncThunk} from "@reduxjs/toolkit";


const getIncomingDocuments = createAsyncThunk(
    'documents/incoming',
    async () => {
        return [];
    }
);

