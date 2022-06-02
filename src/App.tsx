import { useQuery } from "@apollo/client";
import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { apollo, TOKEN_NAME } from "./apollo";
import { GET_ME } from "./apollo/queries/auth.query";
import { GET_ITEMS } from "./apollo/queries/items.query";
import "./index.scss";
import { authSelector, setAuth } from "./redux/auth/auth.slice";
import { itemAction } from "./redux/item/item.slice";
import { useAppDispatch, useAppSelector } from "./redux/store.redux";
import AppRouter from "./routes/route.index";

const App = () => {
	const { user } = useAppSelector(authSelector);
	const dispatch = useAppDispatch();
	useQuery(GET_ITEMS, {
		onCompleted: (data) => dispatch(itemAction.setItems(data.getItems.items)),
		onError: (error) => console.log(error),
	});

	useEffect(() => {
		const getMe = async () => {
			try {
				const { data } = await apollo.query({ query: GET_ME });
				dispatch(setAuth(data.getMe));
			} catch (error) {
				console.log(error);
				Cookies.remove(TOKEN_NAME);
			}
		};
		if (!user) {
			getMe();
		}
	}, [user]);

	return (
		<div>
			<AppRouter />
		</div>
	);
};

export default App;
