import { ApolloError, useMutation } from "@apollo/client";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import React from "react";
import { RESEND_VERIFICATION_EMAIL } from "src/apollo/queries/auth.query";
import HeaderComp from "src/app/shared/header.comp";
import { authSelector } from "src/redux/auth/auth.slice";
import { useAppSelector } from "src/redux/store.redux";

const DashboardLayout: React.FC<{ children: React.ReactElement }> = ({
	children,
}) => {
	const { user } = useAppSelector(authSelector);
	const [resendVerificationEmail] = useMutation(RESEND_VERIFICATION_EMAIL);

	const handleResend = async () => {
		try {
			const { data } = await resendVerificationEmail();
			alert(data?.resendVerificationEmail?.message);
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
		<Wrapper>
			{!user.email_verified_at && (
				<div className="verify-header">
					<p>
						You have not verified your email address.
						<a href="#" onClick={handleResend}>
							Click here{" "}
						</a>
						to resend verification link.
					</p>
				</div>
			)}
			<HeaderComp />
			<main className="dashboard-main">{children}</main>
		</Wrapper>
	);
};

export default DashboardLayout;

const Wrapper = styled(Box)`
	background-color: #fafafa;
	min-height: 100vh;
	.dashboard-main {
		padding-inline: 1.5rem;
	}
	.verify-header {
		background-color: #fff0cb;
		p {
			margin: 0;
			padding: 1rem 1.5rem;
			text-align: center;
			a {
				color: #004cbd;
				text-decoration: none;
			}
		}
	}
`;
