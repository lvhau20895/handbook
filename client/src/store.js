import { configureStore } from "@reduxjs/toolkit";
import userSlice from "Modules/Slices/userSlice";

const store = configureStore({
	reducer: {
		user: userSlice
	}
});

export default store;
