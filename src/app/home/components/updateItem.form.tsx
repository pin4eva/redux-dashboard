import { useMutation } from "@apollo/client";
import styled from "@emotion/styled";
import {
	Box,
	Button,
	FormControl,
	OutlinedInput,
	TextareaAutosize,
} from "@mui/material";
import React, { useState } from "react";
import { UPDATE_ITEM } from "src/apollo/queries/items.query";
import { Item } from "src/interface/item.interface";
import { itemAction, itemSelector } from "src/redux/item/item.slice";
import { useAppDispatch, useAppSelector } from "src/redux/store.redux";

const UpdateItemForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
	const { item: initialItem } = useAppSelector(itemSelector);
	const [item, setItem] = useState<Item | null>(initialItem);
	const [updateItem, { loading }] = useMutation(UPDATE_ITEM);
	const dispatch = useAppDispatch();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const { data } = await updateItem({ variables: { ...item } });
			dispatch(itemAction.updateItem(data.updateItem));
			onClose();
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Form id="eventForm" onSubmit={handleSubmit}>
			<FormControl fullWidth sx={{ mb: 2 }}>
				<label>Name</label>
				<OutlinedInput
					required
					value={item?.name}
					onChange={(e) => setItem({ ...item, name: e.target.value } as Item)}
					type="text"
					placeholder="Input item Name here"
				/>
			</FormControl>
			<FormControl fullWidth sx={{ mb: 5 }}>
				<label style={{ marginBottom: "0.7rem" }}>Add Note</label>
				<TextareaAutosize
					required
					value={item?.description}
					onChange={(e) =>
						setItem({ ...item, description: e.target.value } as Item)
					}
					placeholder="Type here "
					minRows={5}
				/>
			</FormControl>
			<Box sx={{ display: "flex", justifyContent: "end" }}>
				<Button
					disableElevation
					color="inherit"
					variant="contained"
					sx={{ mr: 3 }}
					onClick={() => onClose()}
				>
					cancel
				</Button>
				<Button
					type="submit"
					disableElevation
					color="secondary"
					variant="contained"
					disabled={loading}
				>
					Update Item
				</Button>
			</Box>
		</Form>
	);
};

export default UpdateItemForm;

const Form = styled.form`
	font-size: 14px;
	color: #5f6166;
	input,
	textarea {
		border: 1px solid #efeff0;
	}
	padding-bottom: 2rem;
`;
