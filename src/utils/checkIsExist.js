const createError = require('http-errors');

const checkIsExist = async (q, id, instance) => {
  const result = await q;
  if (!result) {
    throw new createError.NotFound(`${instance} with id ${id} not found`);
  }
  return result;
};

module.exports = checkIsExist;
