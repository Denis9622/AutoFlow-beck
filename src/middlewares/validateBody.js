export const validateBody = (schema) => {
  return (req, res, next) => {
    try {
      schema.validateSync(req.body);
      next();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
};
