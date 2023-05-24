/* eslint-disable react-hooks/exhaustive-deps */
import { useReducer, useEffect } from "react";

const initialState = {
	data: null,
	loading: false,
	error: null
};

const reducer = (state, { type, payload }) => {
	switch (type) {
		case "REQUEST_PENDING":
			return { ...state, loading: true };
		case "REQUEST_FULFILLED":
			return { ...state, data: payload, loading: false };
		case "REQUEST_REJECTED":
			return { ...state, error: payload, loading: false };
		case "REQUEST_FINAL": {
			return { ...state, loading: false };
		}
		default:
			return state;
	}
};

const useRequest = (func, config = {}) => {
	const { manual = false, dependencies = [] } = config;
	const [state, dispatch] = useReducer(reducer, initialState);

	const request = async (...params) => {
		try {
			dispatch({ type: "REQUEST_PENDING" });
			const data = await func(...params);
			return data;
		} catch (error) {
			throw error;
		} finally {
			dispatch({ type: "REQUEST_FINAL" });
		}
	};

	useEffect(() => {
		if (!manual) {
			request()
				.then(data => {
					dispatch({ type: "REQUEST_FULFILLED", payload: data });
				})
				.catch(error => {
					dispatch({ type: "REQUEST_REJECTED", payload: error });
				});
		}
	}, dependencies);

	const result = manual ? request : state.data;

	return { ...state, data: result };
};

export default useRequest;
