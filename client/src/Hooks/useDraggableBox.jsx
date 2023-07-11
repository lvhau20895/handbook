/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";

const useDraggableBox = (containerRef, boxRef, handler, ...other) => {
	const isClicked = useRef(false);
	const coords = useRef({
		startX: 0,
		startY: 0,
		lastX: 0,
		lastY: 0
	});

	useEffect(() => {
		if (!containerRef.current || !boxRef.current) return;

		const container = containerRef.current;
		const box = boxRef.current;

		const containerWidth = container.offsetWidth;
		const containerHeight = container.offsetHeight;

		const boxRect = box.getBoundingClientRect();
		const boxWidth = boxRect.width;
		const boxHeight = boxRect.height;

		const initialX = Math.round((containerWidth - boxWidth) / 2);
		const initialY = Math.round((containerHeight - boxHeight) / 2);

		const percentX = Math.round((initialX / containerWidth) * 100);
		const percentY = Math.round((initialY / containerHeight) * 100);

		box.style.left = `${percentX}%`;
		box.style.top = `${percentY}%`;

		handler(percentX, percentY);

		const onMouseDown = e => {
			isClicked.current = true;
			coords.current = {
				startX: e.clientX,
				startY: e.clientY,
				lastX: box.offsetLeft,
				lastY: box.offsetTop
			};
			box.style.transition = "unset";
		};

		const onMouseMove = e => {
			if (!isClicked.current) return;
			const { startX, startY, lastX, lastY } = coords.current;

			const moveX = e.clientX - startX + lastX;
			const moveY = e.clientY - startY + lastY;

			const maxX = containerWidth - boxWidth;
			const maxY = containerHeight - boxHeight;

			const constrainedX =
				(Math.max(0, Math.min(moveX, maxX)) / containerWidth) * 100;
			const constrainedY =
				(Math.max(0, Math.min(moveY, maxY)) / containerHeight) * 100;

			box.style.left = `${constrainedX}%`;
			box.style.top = `${constrainedY}%`;

			handler(constrainedX, constrainedY);
		};

		const onMouseUp = () => {
			isClicked.current = false;
			box.style.transition = "all 0.1s linear";
		};

		box.addEventListener("mousedown", onMouseDown);
		document.addEventListener("mousemove", onMouseMove);
		document.addEventListener("mouseup", onMouseUp);

		return () => {
			box.removeEventListener("mousedown", onMouseDown);
			document.removeEventListener("mousemove", onMouseMove);
			document.removeEventListener("mouseup", onMouseUp);
		};
	}, [containerRef, boxRef, ...other]);
};

export default useDraggableBox;
