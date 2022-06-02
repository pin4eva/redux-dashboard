import { ApolloError, useMutation } from "@apollo/client";
import styled from "@emotion/styled";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
	Button,
	FormControl,
	IconButton,
	InputAdornment,
	OutlinedInput,
	TextField,
} from "@mui/material";
import Cookies from "js-cookie";
import React, { useMemo, useState } from "react";
import { TOKEN_NAME } from "src/apollo";
import { LOGIN } from "src/apollo/queries/auth.query";
import { checkValidEmailRegex } from "src/utils/helpers";

const LoginForm: React.FC = () => {
	const [showPassword, setShowPassword] = React.useState(false);
	const [info, setInfo] = useState({ email: "", password: "" });

	const [login, { loading }] = useMutation(LOGIN);

	const emailError = useMemo(() => {
		const isError = checkValidEmailRegex(info.email);

		return !isError;
	}, [info.email]);

	const isFormOkay = useMemo(() => {
		if (!emailError && info.email && info.password && !loading) return false;
		return true;
	}, [info.email, info.password, emailError]);

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const { data } = await login({ variables: { ...info } });
			if (data.login) {
				Cookies.set(TOKEN_NAME, `Bearer ${data.login.token}`);
				window.location.href = "/";
			}
		} catch (error) {
			const err = error as ApolloError;
			console.log(error);
			if (err.graphQLErrors) {
				err.graphQLErrors?.map((e) => {
					alert(e.message);
				});
			}
		}
	};
	return (
		<Form onSubmit={onSubmit}>
			<FormControl fullWidth sx={{ mb: "1rem" }}>
				<label>Email Address</label>
				<TextField
					required
					type="email"
					placeholder="Type here"
					value={info.email}
					onChange={(e) => setInfo({ ...info, email: e.target.value })}
					error={Boolean(info.email) && emailError}
					helperText={Boolean(info.email) && emailError && "Wrong email format"}
				/>
			</FormControl>
			<FormControl fullWidth sx={{ mb: "1rem" }}>
				<label>Password</label>
				<OutlinedInput
					type={showPassword ? "text" : "password"}
					placeholder="Type your password here "
					value={info.password}
					onChange={(e) => setInfo({ ...info, password: e.target.value })}
					endAdornment={
						<InputAdornment position="end">
							<IconButton onClick={() => setShowPassword(!showPassword)}>
								{showPassword ? <Visibility /> : <VisibilityOff />}
							</IconButton>
						</InputAdornment>
					}
				/>
			</FormControl>
			<Button
				variant="contained"
				disabled={isFormOkay}
				fullWidth
				color="secondary"
				sx={{ mt: "1rem" }}
				type="submit"
			>
				{loading ? "Processing..." : "Log in"}
			</Button>
		</Form>
	);
};

export default LoginForm;

const Form = styled.form`
	label {
		margin-bottom: 4px;
		font-size: 14px;
		color: #1a1a1a;
	}
`;
