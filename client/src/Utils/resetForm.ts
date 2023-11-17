type Values = { [key: string]: any };

const resetForm = (values: Values) => {
	for (let key in values) {
		values[key] = "";
	}
};

export default resetForm;
