import { useMutation } from "@apollo/client";
import styled from "@emotion/styled";
import {
	Card,
	CardContent,
	Box,
	Typography,
	CardActions,
	Button,
} from "@mui/material";
import React, { useState } from "react";
import { DELETE_ITEM } from "src/apollo/queries/items.query";
import ModalComp from "src/app/shared/modal.comp";
import { Item } from "src/interface/item.interface";
import { itemAction } from "src/redux/item/item.slice";
import { useAppDispatch } from "src/redux/store.redux";
import UpdateItemForm from "./updateItem.form";

const ItemCard: React.FC<{ item: Item }> = ({ item }) => {
	const [modalOpen, setModalOpen] = useState(false);
	const [deleteItem, { loading: deleting }] = useMutation(DELETE_ITEM);
	const dispatch = useAppDispatch();
	const openHandle = () => {
		dispatch(itemAction.setItem(item._id));
		setModalOpen(true);
	};
	const closeHandle = () => setModalOpen(false);

	const handleDelete = async () => {
		const confirmed = window.confirm("Do you really want to delete this item?");
		if (!confirmed) return;
		try {
			await deleteItem({ variables: { uuid: item.uuid } });
			dispatch(itemAction.deleteItem(item._id));
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Wrapper sx={{ minWidth: 275, mb: 2 }}>
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
						<UpdateItemForm onClose={() => setModalOpen(false)} />
					</Box>
				</Box>
			</ModalComp>
			<CardContent>
				<Box sx={{ mb: 2 }}>
					<Typography variant="caption" color="#555658">
						Name
					</Typography>
					<Typography variant="h6">{item?.name}</Typography>
				</Box>
				<Box>
					<Typography variant="caption" color="#555658">
						Description
					</Typography>
					<Typography
						sx={{
							letterSpacing: 0,
							fontSize: "0.8rem",
							fontWeight: 400,
						}}
					>
						{item?.description}
					</Typography>
				</Box>
			</CardContent>
			<CardActions sx={{ display: "flex", justifyContent: "end" }}>
				<Button
					onClick={openHandle}
					color="secondary"
					size="small"
					variant="outlined"
				>
					Edit
				</Button>
				<Button
					onClick={handleDelete}
					disabled={deleting}
					color="secondary"
					size="small"
					variant="contained"
				>
					Delete
				</Button>
			</CardActions>
		</Wrapper>
	);
};

export default ItemCard;

const Wrapper = styled(Card)`
	height: 100%;
	min-height: 235px;
	padding: 20px;
`;
