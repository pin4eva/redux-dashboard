import { Item } from "src/interface/item.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store.redux";
interface ItemSliceProp {
	item: Item | null;
	items: Item[];
}

const initialState = {} as ItemSliceProp;

const itemSlice = createSlice({
	name: "Item",
	initialState,
	reducers: {
		setItem: (state, { payload }: PayloadAction<string>) => {
			return {
				...state,
				item: state.items.find((item) => item._id === payload) || null,
			};
		},
		setItems: (state, { payload }: PayloadAction<Item[]>) => {
			return {
				...state,
				items: payload,
			};
		},
		addItem: (state, { payload }: PayloadAction<Item>) => {
			return {
				...state,
				items: [...state.items, payload],
			};
		},
		updateItem: (state, { payload }: PayloadAction<Item>) => {
			return {
				...state,
				items: state.items.map((item) =>
					item._id === payload._id ? { ...item, ...payload } : item
				),
			};
		},
		deleteItem: (state, { payload }: PayloadAction<string>) => {
			return {
				...state,
				items: state.items.filter((item) => item._id !== payload),
			};
		},
	},
});

export const itemAction = itemSlice.actions;
export const itemSelector = (state: RootState) => state.item;
export default itemSlice.reducer;
