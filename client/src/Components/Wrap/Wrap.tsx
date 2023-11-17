interface WrapProps {
	className?: string;
	children: React.ReactNode;
}

const Wrap = ({ className, children }: WrapProps) => {
	return <div className={className}>{children}</div>;
};

export default Wrap;
