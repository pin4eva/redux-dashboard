import { gql } from "@apollo/client";

const ItemFragment = gql`
	fragment ItemFragment on Item {
		_id
		uuid
		name
		description
		created_at
		updated_at
	}
`;
export const GET_ITEMS = gql`
	{
		getItems {
			pagination {
				currentPage
				maxPages
			}
			items {
				...ItemFragment
			}
		}
	}
	${ItemFragment}
`;

export const CREATE_ITEM = gql`
	mutation CreateItem($name: String!, $description: String) {
		createItem(name: $name, description: $description) {
			...ItemFragment
		}
	}
	${ItemFragment}
`;

export const UPDATE_ITEM = gql`
	mutation UpdateItem($uuid: ID!, $name: String, $description: String) {
		updateItem(uuid: $uuid, name: $name, description: $description) {
			...ItemFragment
		}
	}
	${ItemFragment}
`;

export const DELETE_ITEM = gql`
	mutation DeleteItem($uuid: ID!) {
		deleteItem(uuid: $uuid) {
			uuid
		}
	}
`;
