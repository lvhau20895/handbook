import { User } from "Types/user.type";
import { createSlice } from "@reduxjs/toolkit";
import { login, refreshToken, register } from "Thunks/user.thunk";

interface InitStateUser {
	user?: User | null;
	token: string | null;
	loading: boolean;
	error: string | null;
}

const tokenLocalStorage = localStorage.getItem("token");

export const initialState: InitStateUser = {
	user: null,
	token: tokenLocalStorage ? JSON.parse(tokenLocalStorage) : null,
	loading: false,
	error: null
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(refreshToken.fulfilled, (state, { payload }) => {
				state.token = payload;
			})
			.addCase(login.fulfilled, (state, { payload }) => {
				state.token = payload;
			})
			.addMatcher(
				action => action.type.endsWith("pending"),
				state => {
					state.loading = true;
				}
			)
			.addMatcher(
				action => action.type.endsWith("fulfilled"),
				state => {
					state.loading = false;
				}
			)
			.addMatcher(
				action => action.type.endsWith("rejected"),
				(state, { payload }) => {
					state.loading = false;
					state.error = payload;
				}
			);
	}
});

export default userSlice.reducer;
