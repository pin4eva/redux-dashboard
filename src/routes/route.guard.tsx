import React from "react";
import { Navigate } from "react-router-dom";

interface IProp {
	isAuth: boolean;
	isProtected: boolean;
	children: React.ReactElement;
}

const AppGuard: React.FC<IProp> = ({
	isProtected,
	isAuth,
	children,
}: IProp) => {
	if (isProtected) {
		if (isAuth) {
			return <>{children}</>;
		}

		return <Navigate to="/login" />;
	} else if (!isProtected && isAuth) {
		return <Navigate to="/" />;
	}

	return <>{children}</>;
};

export default AppGuard;
