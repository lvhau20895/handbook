import { useEffect, useRef } from "react";

const useDraggableBox = (containerRef, boxRef, content) => {
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

		box.style.left = `${initialX}px`;
		box.style.top = `${initialY}px`;

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

			const constrainedX = Math.max(0, Math.min(moveX, maxX));
			const constrainedY = Math.max(0, Math.min(moveY, maxY));

			box.style.left = `${constrainedX}px`;
			box.style.top = `${constrainedY}px`;
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
	}, [containerRef, boxRef, content]);
};

export default useDraggableBox;
