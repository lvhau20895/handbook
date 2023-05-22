const success = (res, message, data) => {
	res.status(200).json({
		statusCode: 200,
		message,
		result: data
	});
};

const fail = (res, message) => {
	res.status(400).json({
		statusCode: 400,
		message
	});
};

const error = (res, message) => {
	res.status(500).json({
		statusCode: 500,
		message
	});
};

module.exports = { success, fail, error };
