import { ApolloError, useMutation } from "@apollo/client";
import styled from "@emotion/styled";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
	Box,
	Button,
	FormControl,
	Grid,
	IconButton,
	InputAdornment,
	OutlinedInput,
	TextField,
	Typography,
} from "@mui/material";
import Cookies from "js-cookie";
import React, { useMemo, useState } from "react";
import { TOKEN_NAME } from "src/apollo";
import { SIGNUP } from "src/apollo/queries/auth.query";
import { SignupPayload } from "src/interface/user.interface";
import { checkValidEmailRegex, validatePassword } from "src/utils/helpers";

const SignupForm = () => {
	const [showPassword, setShowPassword] = React.useState(false);
	const [input, setInput] = useState<SignupPayload>({} as SignupPayload);
	const [signup, { loading }] = useMutation(SIGNUP);

	const emailError = useMemo(() => {
		const isError = checkValidEmailRegex(input.email);

		return !isError;
	}, [input.email]);

	const passwordValidator = useMemo(() => {
		const result = validatePassword(input.password);

		return result;
	}, [input.password]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value, name } = e.target;

		setInput({ ...input, [name]: value });
	};

	const isFormOkay = useMemo(() => {
		const isPasswordOkay = Object.values(passwordValidator).every((v) => v);

		if (!isPasswordOkay || emailError) {
			return false;
		} else {
			return true;
		}
	}, [input.email, passwordValidator]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!isFormOkay) return;

		try {
			const { data } = await signup({ variables: { ...input } });
			if (data) {
				alert("Successfully created your account");
				Cookies.set(TOKEN_NAME, data.signup.token);
				window.location.href = "/";
			}
		} catch (error) {
			const err = error as ApolloError;
			console.log(error);
			if (err?.graphQLErrors) {
				err.graphQLErrors?.map((er) => {
					alert(er.message);
				});
			}
		}
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Grid container columnSpacing={2} sx={{ mt: 2 }}>
				<Grid item xs={6}>
					<FormControl fullWidth sx={{ mb: "1rem" }}>
						<label>First Name</label>
						<OutlinedInput
							name="first_name"
							value={input.first_name}
							onChange={handleChange}
							type="text"
							placeholder="Type here"
							required
						/>
					</FormControl>
				</Grid>
				<Grid item xs={6}>
					<FormControl fullWidth sx={{ mb: "1rem" }}>
						<label>Last Name</label>
						<OutlinedInput
							name="last_name"
							value={input.last_name}
							onChange={handleChange}
							type="text"
							placeholder="Type here"
							required
						/>
					</FormControl>
				</Grid>
			</Grid>
			<FormControl fullWidth sx={{ mb: "1rem" }}>
				<label>Email Address</label>
				<TextField
					name="email"
					value={input.email}
					onChange={handleChange}
					type="email"
					placeholder="Type here"
					error={Boolean(input.email) && emailError}
					helperText={
						Boolean(input.email) && emailError && "Wrong email format"
					}
				/>
			</FormControl>
			<FormControl fullWidth sx={{ mb: "1rem" }}>
				<label>Password</label>
				<OutlinedInput
					type={showPassword ? "text" : "password"}
					name="password"
					value={input.password}
					onChange={handleChange}
					placeholder="Type your password here "
					endAdornment={
						<InputAdornment position="end">
							<IconButton onClick={() => setShowPassword(!showPassword)}>
								{showPassword ? <Visibility /> : <VisibilityOff />}
							</IconButton>
						</InputAdornment>
					}
				/>
				{input.password && (
					<Box mt={1}>
						<PasswordValidatorHelper
							correct={passwordValidator.hasUpperCase}
							text="Contains at least one uppercase letter"
						/>
						<PasswordValidatorHelper
							correct={passwordValidator.hasMinLength}
							text="Contains eight characters"
						/>
						<PasswordValidatorHelper
							correct={passwordValidator.hasNumber}
							text="Contains at least one number"
						/>
						<PasswordValidatorHelper
							correct={passwordValidator.hasSymbol}
							text="Contains at least one symbol"
						/>
					</Box>
				)}
			</FormControl>
			<Button
				variant="contained"
				fullWidth
				color="secondary"
				sx={{ mt: "1rem" }}
				type="submit"
				disabled={!isFormOkay || loading}
			>
				{loading ? "Processing" : "Sign Up"}
			</Button>
		</Form>
	);
};

export default SignupForm;

const Form = styled.form`
	label {
		margin-bottom: 4px;
		font-size: 14px;
		color: #1a1a1a;
	}
	.validator-group {
		display: flex;
		align-items: center;
		.dot {
			height: 8px;
			width: 8px;
			border-radius: 100%;
			margin-right: 1rem;
		}
	}
`;

const PasswordValidatorHelper = ({
	correct,
	text,
}: {
	correct: boolean;
	text: string;
}) => {
	const success = "#07982F";
	const muted = "#999B9F";
	return (
		<div className="validator-group">
			<Box
				className="dot"
				sx={{
					border: `1px solid ${correct ? success : muted}`,
					bgcolor: correct ? success : "white",
				}}
			></Box>
			<Typography variant="caption" color={correct ? success : muted}>
				{text}
			</Typography>
		</div>
	);
};
