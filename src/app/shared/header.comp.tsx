import styled from "@emotion/styled";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
	AppBar,
	Box,
	Button,
	Popover,
	Toolbar,
	Typography,
} from "@mui/material";
import React, { useState } from "react";
import { authSelector, logout } from "src/redux/auth/auth.slice";
import { useAppDispatch, useAppSelector } from "src/redux/store.redux";

const HeaderComp = () => {
	const [popover, setPopover] = useState<HTMLButtonElement | null>(null);
	const { user } = useAppSelector(authSelector);
	const dispatch = useAppDispatch();

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		setPopover(e.currentTarget);
	};

	const handleClose = () => {
		setPopover(null);
	};
	const open = Boolean(popover);
	const id = open ? "log-out" : undefined;

	return (
		<Header
			position="static"
			color="default"
			sx={{ bgcolor: "white", mb: "2rem" }}
			elevation={1}
		>
			<Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
				<Typography>Dashboard</Typography>
				<Box>
					<Button
						onClick={handleClick}
						aria-label="logout"
						disableElevation
						aria-describedby={id}
						color="inherit"
					>
						<Typography
							sx={{ mr: 2 }}
						>{`${user?.first_name} ${user?.last_name}`}</Typography>
						<ArrowDropDownIcon />
					</Button>
					<Popover
						id={id}
						open={open}
						anchorEl={popover}
						onClose={handleClose}
						anchorOrigin={{
							vertical: "bottom",
							horizontal: "left",
						}}
					>
						<Typography
							onClick={() => dispatch(logout())}
							color={"red"}
							sx={{ p: 2, width: "7.125rem", cursor: "pointer" }}
						>
							Log Out
						</Typography>
					</Popover>
				</Box>
			</Toolbar>
		</Header>
	);
};

export default HeaderComp;

const Header = styled(AppBar)``;
