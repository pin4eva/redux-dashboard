import Cookies from "js-cookie";
import React, { BrowserRouter, Route, Routes } from "react-router-dom";
import { TOKEN_NAME } from "src/apollo";
import LoginView from "src/app/auth/views/login.view";
import SignupView from "src/app/auth/views/signup.view";
import EmailVerifyView from "src/app/auth/views/verify.view";
import HomeView from "src/app/home/views/home.view";
import AuthLayout from "src/layouts/auth.layout";
import DashboardLayout from "src/layouts/dashboard.layout";
import { authSelector } from "src/redux/auth/auth.slice";
import { useAppSelector } from "src/redux/store.redux";
import AppGuard from "./route.guard";

const AppRouter = () => {
	const { user } = useAppSelector(authSelector);
	const isAuth = Boolean(Cookies.get(TOKEN_NAME));

	if (isAuth && !user) return <p>loading...</p>;
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={
						<AppGuard isProtected={true} isAuth={isAuth}>
							<DashboardLayout>
								<HomeView />
							</DashboardLayout>
						</AppGuard>
					}
				/>
				<Route
					path="/login"
					element={
						<AppGuard isProtected={false} isAuth={isAuth}>
							<AuthLayout>
								<LoginView />
							</AuthLayout>
						</AppGuard>
					}
				/>
				<Route
					path="/signup"
					element={
						<AppGuard isProtected={false} isAuth={isAuth}>
							<AuthLayout>
								<SignupView />
							</AuthLayout>
						</AppGuard>
					}
				/>
				<Route
					path="/email/verify/:token"
					element={
						<AppGuard isProtected={false} isAuth={isAuth}>
							<AuthLayout>
								<EmailVerifyView />
							</AuthLayout>
						</AppGuard>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
};

export default AppRouter;
