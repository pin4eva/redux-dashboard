import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { TOKEN_NAME } from "src/apollo";
import { IUser } from "src/interface/user.interface";
import { RootState } from "../store.redux";

const initialState = {
	user: null as unknown as IUser,
};

export const authSlice = createSlice({
	name: "Auth",
	initialState,
	reducers: {
		setAuth: (state, { payload }: PayloadAction<IUser>) => {
			state.user = payload;
		},
		logout: (state) => {
			Cookies.remove(TOKEN_NAME);
			state.user = null as unknown as IUser;
			window.location.href = "/login";
		},
	},
});

export const { setAuth, logout } = authSlice.actions;
export const authSelector = (state: RootState) => state.auth;
export default authSlice.reducer;
