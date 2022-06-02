import styled from "@emotion/styled";
import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/login.form";

const LoginView = () => {
	return (
		<Wrapper>
			<div className="text-content">
				<h1>Log in</h1>
				<p>
					If you have no account, <Link to="/signup">Sign up</Link>
				</p>
			</div>
			<LoginForm />
		</Wrapper>
	);
};

export default LoginView;

const Wrapper = styled.div``;
