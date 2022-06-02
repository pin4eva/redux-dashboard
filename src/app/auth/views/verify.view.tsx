import { useMutation } from "@apollo/client";
import styled from "@emotion/styled";
import { Check, ChevronRight } from "@mui/icons-material";
import { Typography } from "@mui/material";
import React, { useLayoutEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { VERIFY_ME } from "src/apollo/queries/auth.query";

const EmailVerifyView: React.FC = () => {
	const { token } = useParams<{ token: string }>();
	const [verifyme, { loading, error }] = useMutation(VERIFY_ME);
	const navigation = useNavigate();

	useLayoutEffect(() => {
		const handleVerify = async () => {
			try {
				await verifyme({ variables: { token } });
			} catch (error) {
				console.log(error);
				window.setTimeout(() => {
					navigation("/login");
				}, 7000);
			}
		};
		handleVerify();
	}, [token]);

	if (loading) return <p>Loading...</p>;
	if (error)
		return (
			<>
				{error.graphQLErrors.map((err, i) => (
					<p key={i}>{err.message}</p>
				))}
			</>
		);
	return (
		<Wrapper>
			<div className="inner">
				<div className="icon-container">
					<Check color="success" fontSize="large" sx={{ fontWeight: "bold" }} />
				</div>
				<Typography variant="h5" mt={4}>
					Your email address has been verified.
				</Typography>
				{/* Replaced with anchor tag because I want to entire App to reload */}
				<a href="/">
					Go to Dashboard <ChevronRight />
				</a>
			</div>
		</Wrapper>
	);
};

export default EmailVerifyView;

const Wrapper = styled.div`
	min-height: 450px;
	display: grid;
	place-items: center;
	.inner {
		display: grid;
		place-items: center;
		text-align: center;
		a {
			display: flex;
			text-decoration: none;
			margin-top: 18px;
			color: #004cbd;
		}
		.icon-container {
			height: 64px;
			width: 64px;
			border: 4px solid #07982f;
			border-radius: 100%;
			display: grid;
			place-items: center;
		}
	}
`;
