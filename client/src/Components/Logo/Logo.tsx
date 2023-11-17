import { Link } from "react-router-dom";

interface LogoProps {
	width: number;
	height: number;
}

const Logo = ({ width, height }: LogoProps) => {
	return (
		<Link to="/">
			<img
				src="/images/logo.png"
				alt="logo"
				width={width}
				height={height}
			/>
		</Link>
	);
};

export default Logo;
