const adapter = require('./adapter');
const config = require('./config');

const page = options => (options.page === undefined ? config.defaultPage : options.page);
const limit = options => (options.limit === undefined ? config.defaultLimit : options.limit);

exports.paginate = (content, request, options) => {
  const currentAdapter = adapter;
  const adapterParams = { content, page: page(options), limit: limit(options), request };
  try {
    return currentAdapter.responseFormat(adapterParams);
  } catch (error) {
    throw error;
  }
};
