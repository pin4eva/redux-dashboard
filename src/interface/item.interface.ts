export interface Item {
	_id: string;
	uuid: string;
	name: string;
	description: string;
	created_at: Date;
	updated_at: Date;
}

export interface IPagination {
	currentPage: number;
	maxPage: number;
}

export interface GetItemResponse {
	items: Item[];
	pagination: IPagination;
}

export interface CreateItemPayload {
	name: string;
	description: string;
}
