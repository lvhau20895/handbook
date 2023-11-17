import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "store";

const CheckoutRoute = () => {
	const { token } = useAppSelector(state => state.user);

	if (!token) return <Navigate to="/login" />;

	return <Outlet />;
};

export default CheckoutRoute;
