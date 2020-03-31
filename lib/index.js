const paginate = require('./pagination/paginate');
const config = require('./pagination/config');

module.exports = {
  ...paginate,
  ...config
};
