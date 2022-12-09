const ErrorHandler = (err, res) => {
  const error = {};
  if (err.name == "CastError") {
    error.status = 404;
    error.message = "Invalid Resource Id";
  }

  if (err.code == 11000) {
    error.status = 400;
    error.message = `Email Address already exist`;
  }

  if (err.name == "ValidationError") {
    error.status = 400;
    error.message = Object.values(err.errors)
      .map((e) => e.properties.message)
      .reverse();
  }
  res
    .status(error.status || 500)
    .json({ type: "error", message: error.message || "Internal Server Error" });
};

export default ErrorHandler;
