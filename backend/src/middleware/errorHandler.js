export function notFound(_req, _res, next) {
  const error = new Error("Route not found");
  error.statusCode = 404;
  next(error);
}

export function errorHandler(error, _req, res, _next) {
  const statusCode = error.statusCode || 500;
  return res.status(statusCode).json({
    success: false,
    message: error.message || "Internal server error",
    details: error.details || null,
    stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
  });
}
