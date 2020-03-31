const nodePagination = require('../..');

exports.defaultPagParams = request => ({
  page_count: nodePagination.defaultLimit,
  count: nodePagination.defaultLimit,
  total_count: 30,
  total_pages: Math.ceil(30 / nodePagination.defaultLimit),
  previous_page: null,
  current_page: nodePagination.defaultPage,
  next_page: 2,
  previous_page_url: null,
  next_page_url: `${request.url}?page=2`
});
