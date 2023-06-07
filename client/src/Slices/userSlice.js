import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userAPI from "Apis/userAPI";

const initialState = {
    user: {},
    token: JSON.parse(localStorage.getItem("token")) || null,
    loading: false,
    error: null,
};

export const refreshToken = createAsyncThunk(
    "refresh-token",
    async (bearerToken, { rejectWithValue }) => {
        try {
            const data = await userAPI.refreshToken(bearerToken);
            localStorage.setItem("token", JSON.stringify(data));
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const login = createAsyncThunk(
    "user/login",
    async (values, { rejectWithValue }) => {
        try {
            const data = await userAPI.login(values);
            localStorage.setItem("token", JSON.stringify(data));
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const getUser = createAsyncThunk(
    "user/get-user",
    async (_, { rejectWithValue }) => {
        try {
            const data = await userAPI.getUser();
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const getData = (builder, data, func) => {
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

const userSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: (builder) => {
        getData(builder, "token", login);
        getData(builder, "user", getUser);
        getData(builder, "token", refreshToken);
    },
});

export default userSlice.reducer;
