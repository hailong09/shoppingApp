import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import { createContext, useReducer, useEffect, useContext } from "react";
import axiosInstance from "../axiosInstance";
import Cookies from "js-cookie";
import {
	ADD_ITEM,
	CART_ITEMS,
	EMPTY_CART,
	OPEN_CART,
	REMOVE_ITEM,
	SET_AUTH,
	SET_ORDER_HISTORY,
	USER_TOKEN,
} from "../constant";
import { reducer } from "../reducer/Reducer";
import { setAuthToken } from "../utils/setAuthToken";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
	const router = useRouter();

	const [state, dispatch] = useReducer(reducer, {
		isAuthenticated: false,
		user: null,
		cart: {
			open: false,
			cartItems: Cookies.get(CART_ITEMS)
				? JSON.parse(Cookies.get(CART_ITEMS))
				: [],
		},

		orderHistory: [],
	});

	const loadOrderHistory = async () => {
		if (state.user && state.isAuthenticated) {
			try {
				const res = await axiosInstance.get(
					`/order/order-history?userId=${state.user.Id}`
				);

				if (res.data) {
					dispatch({
						type: SET_ORDER_HISTORY,
						payload: {
							orderHistory: res.data,
						},
					});
				}
			} catch (error) {
				console.log(error);
			}
		}
	};

	//Load user if user already logged in
	const loadUser = () => {
		if (localStorage[USER_TOKEN]) {
			const token = localStorage[USER_TOKEN];
			setAuthToken(token);
			const decoded = jwtDecode(token);
			if (decoded) {
				dispatch({
					type: SET_AUTH,
					payload: {
						isAuthenticated: true,
						user: decoded,
					},
				});
				return;
			}

			localStorage.removeItem(USER_TOKEN);
		}

		dispatch({
			type: SET_AUTH,
			payload: {
				isAuthenticated: false,
				user: null,
			},
		});
	};

	//Load Items if item already stored

	const authenticate = async (values, path) => {
		const res = await axiosInstance.post(path, values);
		if (!res.data) {
			return;
		}

		localStorage.setItem(USER_TOKEN, res.data);
		setAuthToken(res.data);
		const decoded = jwtDecode(res.data);
		if (decoded) {
			dispatch({
				type: SET_AUTH,
				payload: {
					isAuthenticated: true,
					user: decoded,
				},
			});
			return;
		}
	};

	//Log out
	const logout = () => {
		localStorage.removeItem(USER_TOKEN);
		dispatch({
			type: SET_AUTH,
			payload: {
				isAuthenticated: false,
				user: null,
			},
		});
		router.replace("/");
	};

	const addItemToCart = (item) => {
		dispatch({
			type: ADD_ITEM,
			payload: {
				newItem: item,
			},
		});
	};

	const removeItemCart = (itemId) => {
		dispatch({
			type: REMOVE_ITEM,
			payload: {
				itemId,
			},
		});
	};

	const openCart = (isOpen) => {
		dispatch({
			type: OPEN_CART,
			payload: {
				open: isOpen,
			},
		});
	};

	const emptyCart = () => {
		dispatch({ type: EMPTY_CART });
	};

	const checkOut = async (orderRequest) => {
		try {
			const orderResponse = await axiosInstance.post(
				"/order/save-order",
				orderRequest
			);

			if (orderResponse.data) {
				return orderResponse.data.id;
			}
		} catch (error) {
			console.log(error);
		}
	};

	const data = {
		state,
		authenticate,
		logout,
		loadUser,
		addItemToCart,
		openCart,
		removeItemCart,
		checkOut,
		emptyCart,
		loadOrderHistory,
	};

	useEffect(() => {
		loadUser();
	}, []);

	return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
};

export const useGlobalContext = () => useContext(AppContext);
export default AppProvider;
