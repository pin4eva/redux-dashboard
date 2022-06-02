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
import { CREATE_ITEM } from "src/apollo/queries/items.query";
import { CreateItemPayload } from "src/interface/item.interface";
import { itemAction } from "src/redux/item/item.slice";
import { useAppDispatch } from "src/redux/store.redux";

const CreateItemForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
	const [item, setItem] = useState<CreateItemPayload>({} as CreateItemPayload);
	const [createItem, { loading }] = useMutation(CREATE_ITEM);
	const dispatch = useAppDispatch();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const { data } = await createItem({ variables: { ...item } });
			dispatch(itemAction.addItem(data.createItem));
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
					value={item.name}
					onChange={(e) => setItem({ ...item, name: e.target.value })}
					type="text"
					placeholder="Input item Name here"
				/>
			</FormControl>
			<FormControl fullWidth sx={{ mb: 5 }}>
				<label style={{ marginBottom: "0.7rem" }}>Add Note</label>
				<TextareaAutosize
					required
					value={item.description}
					onChange={(e) => setItem({ ...item, description: e.target.value })}
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
					Create Event
				</Button>
			</Box>
		</Form>
	);
};

export default CreateItemForm;

const Form = styled.form`
	font-size: 14px;
	color: #5f6166;
	input,
	textarea {
		border: 1px solid #efeff0;
	}
	padding-bottom: 2rem;
`;
