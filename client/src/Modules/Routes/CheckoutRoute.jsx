import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const CheckoutRoute = () => {
	const { token } = useSelector(state => state.user);

	if (!token) {
		return <Navigate to="/login" replace />;
	}

	return <Outlet />;
};

export default CheckoutRoute;
