import Cookies from "js-cookie";
import {
	ADD_ITEM,
	CART_ITEMS,
	EMPTY_CART,
	OPEN_CART,
	REMOVE_ITEM,
	SET_AUTH,
	SET_ITEM,
	SET_ORDER_HISTORY,
} from "../constant";

export const reducer = (state, action) => {
	const { type, payload } = action;
	switch (type) {
		case SET_AUTH:
			return {
				...state,
				user: payload.user,
				isAuthenticated: payload.isAuthenticated,
			};
		case OPEN_CART:
			return {
				...state,
				cart: {
					...state.cart,
					open: payload.open,
				},
			};
		case EMPTY_CART:
			Cookies.remove(CART_ITEMS);
			return {
				...state,
				cart: {
					open: false,
					cartItems: [],
				},
			};

		case SET_ITEM: {
			return {
				...state,
				cart: {
					...state.cart,
					cartItems: payload.items,
				},
			};
		}
		case ADD_ITEM:
			const existItem = state.cart.cartItems.find(
				(item) => item.id === payload.newItem.id
			);
			const updatedItems = existItem
				? state.cart.cartItems.map((item) =>
						item.id === payload.newItem.id ? payload.newItem : item
				  )
				: [...state.cart.cartItems, payload.newItem];
			Cookies.set(CART_ITEMS, JSON.stringify(updatedItems));
			return {
				...state,
				cart: {
					...state.cart,
					cartItems: updatedItems,
				},
			};
		case REMOVE_ITEM:
			const filterItems = state.cart.cartItems.filter(
				(item) => item.id !== payload.itemId
			);
			Cookies.set(CART_ITEMS, JSON.stringify(filterItems));
			return {
				...state,
				cart: {
					...state.cart,
					cartItems: filterItems,
				},
			};

		case SET_ORDER_HISTORY: {
			return {
				...state,
				orderHistory: [...payload.orderHistory],
			};
		}
		default:
			return state;
	}
};
