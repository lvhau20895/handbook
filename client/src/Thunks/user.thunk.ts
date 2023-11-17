import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "Types/user.type";
import userAPI from "Apis/user.api";

type ValueRegister = Pick<User, "username" | "email" | "password">;
type ValueLogin = Pick<User, "username" | "password">;
type ValueForgot = { email: string };

export const refreshToken = createAsyncThunk("user/refresh-token", async (_, { rejectWithValue }) => {
	try {
		const data = await userAPI.refreshToken<string>();
		localStorage.setItem("accessToken", JSON.stringify(data));
		return data;
	} catch (error) {
		return rejectWithValue(error);
	}
});

export const register = createAsyncThunk("user/register", async (values: ValueRegister, { rejectWithValue }) => {
	try {
		await userAPI.register(values);
	} catch (error) {
		return rejectWithValue(error);
	}
});

export const login = createAsyncThunk("user/login", async (values: ValueLogin, { rejectWithValue }) => {
	try {
		const data = await userAPI.login(values);
		localStorage.setItem("token", JSON.stringify(data));
		return data;
	} catch (error) {
		return rejectWithValue(error);
	}
});

export const forgot = createAsyncThunk("user/forgot", async (values: ValueForgot, { rejectWithValue }) => {
	try {
		await userAPI.forgot(values);
	} catch (error) {
		return rejectWithValue(error);
	}
});
