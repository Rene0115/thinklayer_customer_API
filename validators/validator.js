/* eslint-disable consistent-return */
const validator = (schema, reqbody = 'body') => async (req, res, next) => {
  const validated = await schema.validateAsync(req.body);
  try {
    if (reqbody === 'body') {
      req.body = validated;
    } else {
      req.query = validated;
    }
    next();
  } catch (error) {
    return res.status(500).send({
      success: false,
      body: error
    });
  }
};

export default validator;
