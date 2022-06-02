import React from "react";
import { Link } from "react-router-dom";
import SignupForm from "../components/signup.form";

const SignupView = () => {
	return (
		<div>
			<div className="text-content">
				<h1>Create an Account</h1>
				<p>
					Already have an account? <Link to="/login">Log in</Link>
				</p>
			</div>
			<SignupForm />
		</div>
	);
};

export default SignupView;
