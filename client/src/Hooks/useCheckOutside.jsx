import { useEffect } from "react";

const useCheckOutside = (ref, handler) => {
	useEffect(() => {
		const checkOutside = e => {
			if (ref.current && !ref.current.contains(e.target)) {
				handler();
			}
		};
		document.addEventListener("mousedown", checkOutside);

		return () => {
			document.removeEventListener("mousedown", checkOutside);
		};
	}, [ref, handler]);
};

export default useCheckOutside;
