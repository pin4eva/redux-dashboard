import styled from "@emotion/styled";
import React from "react";

const AuthLayout: React.FC<{ children: React.ReactElement }> = ({
	children,
}) => {
	return (
		<Wrapper>
			<div className="auth-main">
				<div className="inner">{children}</div>
			</div>
		</Wrapper>
	);
};

export default AuthLayout;

const Wrapper = styled.div`
	background-color: #fafafa;
	min-height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	.auth-main {
		width: 100%;
		max-width: 45rem;
		min-height: 80vh;
		.inner {
			background-color: white;
			padding-inline: 2rem;
			padding-block: 1.5rem 2rem;
			.text-content {
				text-align: center;
				h1 {
					font-size: 1.5rem;
					margin: 0;
					line-height: 32.78px;
					font-weight: 500;
					color: black;
				}
				p {
					margin: 0;
					color: #777777;
				}
				a {
					text-decoration: none;
					color: #004cbd;
				}
			}
		}
	}
`;
