import {
	ApolloClient,
	InMemoryCache,
	NormalizedCacheObject,
} from "@apollo/client";
import Cookies from "js-cookie";

export const TOKEN_NAME = "_demo.t";

const uri = `${import.meta.env.VITE_SERVER_URL}/graphql`;

export const apollo: ApolloClient<NormalizedCacheObject> = new ApolloClient({
	uri,
	cache: new InMemoryCache(),
	// credentials: "include",
	headers: {
		Authorization: Cookies.get(TOKEN_NAME) || " ",
	},
});
