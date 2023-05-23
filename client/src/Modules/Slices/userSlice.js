import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userAPI from "Apis/userAPI";

const initialState = {
    user: {},
    loading: false,
    error: true,
};

const handleBuilder = (builder, func, data) => {
    builder.addCase(func.pending, (state) => {
        state.loading = true;
    });
    builder.addCase(func.fulfilled, (state, { payload }) => {
        state[data] = payload;
        state.loading = false;
    });
    builder.addCase(func.rejected, (state, { payload }) => {
        state.error = payload;
        state.loading = false;
    });
};

const login = createAsyncThunk("user/login");

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase();
    },
});
