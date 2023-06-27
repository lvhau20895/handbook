import React from "react";
import { useParams } from "react-router-dom";
import StoryImage from "Components/StoryImage";
import StoryText from "Components/StoryText";
import StoryVideo from "Components/StoryVideo";

const StoryType = () => {
	const { type } = useParams();

	return (
		<>
			{type === "text" && <StoryText />}
			{type === "image" && <StoryImage />}
			{type === "video" && <StoryVideo />}
		</>
	);
};

export default StoryType;
