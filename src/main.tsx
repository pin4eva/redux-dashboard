import { ApolloProvider } from "@apollo/client";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import ReactDOM from "react-dom/client";
import { apollo } from "./apollo";
import App from "./App";
import theme from "./theme";
import { Provider } from "react-redux";
import store from "./redux/store.redux";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Provider store={store}>
			<ApolloProvider client={apollo}>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<App />
				</ThemeProvider>
			</ApolloProvider>
		</Provider>
	</React.StrictMode>
);
