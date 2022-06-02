import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
	palette: {
		primary: {
			main: "#004CBD",
		},
		secondary: {
			main: "#555658",
		},
		success: {
			main: "#07982F",
		},
		error: {
			main: "#F41E10",
		},
	},
	components: {
		MuiInputBase: {
			styleOverrides: {
				root: {
					height: "2.5rem",
				},
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					padding: 0,
				},
				input: {
					boxSizing: "border-box",
					backgroundColor: "white",
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: "capitalize",
					borderRadius: "4px",
					fontWeight: "bold",
					"&.Mui-disabled": {
						backgroundColor: "#B7BCC3",
						color: "white",
					},
				},
				disableElevation: true,
			},
		},
	},
});

theme = responsiveFontSizes(theme);
export default theme;
