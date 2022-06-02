import { Box, Modal } from "@mui/material";
import React from "react";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 500,
	bgcolor: "background.paper",
	// border: "2px solid #000",
	boxShadow: 24,
	borderRadius: 4,
};

interface IProp {
	open: boolean;
	closeHandle: () => void;
	children: React.ReactElement;
}

const ModalComp: React.FC<IProp> = ({ open, closeHandle, children }) => {
	return (
		<Modal open={open} onClose={closeHandle}>
			<Box sx={style}>{children}</Box>
		</Modal>
	);
};

export default ModalComp;
