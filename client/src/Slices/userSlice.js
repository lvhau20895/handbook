import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userAPI from "Apis/userAPI";

const initialState = {
    token: JSON.parse(localStorage.getItem("token")) || null,
    loading: false,
    error: null,
};

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
    reducers: {
        loginSuccess: () => {},
    },
    extraReducers: (builder) => {
        getData(builder, "token", login);
    },
});

export const { loginSuccess } = userSlice.actions;
export default userSlice.reducer;
