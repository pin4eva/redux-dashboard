import { Action, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { ThunkAction } from "redux-thunk";
import auth from "./auth/auth.slice";
import item from "./item/item.slice";
export const store = configureStore({
	reducer: {
		auth,
		item,
	},
});
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;

export default store;
