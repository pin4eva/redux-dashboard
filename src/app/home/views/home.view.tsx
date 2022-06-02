import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import ModalComp from "src/app/shared/modal.comp";
import { itemSelector } from "src/redux/item/item.slice";
import { useAppSelector } from "src/redux/store.redux";
import CreateEventForm from "../components/createItem.form";
import ItemCard from "../components/ItemCard";

const HomeView: React.FC = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const openHandle = () => setModalOpen(true);
	const closeHandle = () => setModalOpen(false);
	const { items } = useAppSelector(itemSelector);
	return (
		<Box>
			<Grid
				container
				spacing={{ xs: 2, md: 3 }}
				columns={{ xs: 4, sm: 8, md: 12 }}
			>
				{items?.map((item, i) => (
					<Grid key={i} item xs={2} sm={4} md={4}>
						<ItemCard item={item} />
					</Grid>
				))}
			</Grid>
			<IconButton
				onClick={openHandle}
				sx={{ position: "fixed", bottom: 43, right: 41 }}
			>
				<AddCircleIcon fontSize="large" color="primary" />
			</IconButton>
			<ModalComp open={modalOpen} closeHandle={closeHandle}>
				<Box>
					<Box
						sx={{
							borderBottomColor: "#EFEFF0",
							borderBottomStyle: "solid",
							borderBottomWidth: 1,
							px: 4,
							py: 2,
						}}
					>
						<Typography sx={{ fontWeight: "400" }}>Create Item</Typography>
					</Box>
					<Box
						sx={{
							px: 4,
							mt: 2,
						}}
					>
						<CreateEventForm onClose={() => setModalOpen(false)} />
					</Box>
				</Box>
			</ModalComp>
		</Box>
	);
};

export default HomeView;
