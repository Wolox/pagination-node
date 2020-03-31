exports.customPagParams = request => ({
  page_count: 5,
  count: 5,
  total_count: 30,
  total_pages: Math.ceil(30 / 5),
  previous_page: 2,
  current_page: 3,
  next_page: 4,
  previous_page_url: `${request.url}?page=2`,
  next_page_url: `${request.url}?page=4`
});
