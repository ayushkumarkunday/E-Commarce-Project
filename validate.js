export const validate = (req, res, next) => {
  const errors = req.validationErrors || [];

  if (errors.length > 0) {
    return res.status(400).json({
      message: "Validation failed",
      errors
    });
  }

  next();
};
