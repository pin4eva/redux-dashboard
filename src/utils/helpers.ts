const emailRegex =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const hasUpperCaseRegex = /^(?=.*[A-Z])(?!.*_).+/;
const hasNumberRegex = /.*[0-9].*/;
const hasSymbolRegex = /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/;

export const checkValidEmailRegex = (email: string): boolean => {
	return emailRegex.test(email);
};

export const validatePassword = (password: string) => {
	const hasUpperCase = hasUpperCaseRegex.test(password);
	const hasMinLength = password?.length >= 8;
	const hasNumber = hasNumberRegex.test(password);
	const hasSymbol = hasSymbolRegex.test(password);

	return { hasUpperCase, hasMinLength, hasNumber, hasSymbol };
};
