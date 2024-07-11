export const validar = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    // const data = error.format();
    // const err = data.name._errors[0];
    // console = console.log(err);

    return res.json(error.format());
  }
};
