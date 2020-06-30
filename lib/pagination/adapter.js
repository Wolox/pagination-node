const { invalidPageNumberError, invalidLimitNumberError } = require('./errors');

const minOffset = adapterParams =>
  adapterParams.page === 1 ? 0 : (adapterParams.page - 1) * adapterParams.limit;

const maxOffset = adapterParams => minOffset(adapterParams) + adapterParams.limit;

const paginatedContent = adapterParams =>
  adapterParams.content.slice(minOffset(adapterParams), maxOffset(adapterParams));

const count = adapterParams => paginatedContent(adapterParams).length;

const totalCount = adapterParams => adapterParams.content.length;

const previousPage = adapterParams => (adapterParams.page === 1 ? null : adapterParams.page - 1);

const totalPages = adapterParams => Math.ceil(totalCount(adapterParams) / adapterParams.limit);

const nextPage = adapterParams =>
  adapterParams.page >= totalPages(adapterParams) ? null : adapterParams.page + 1;

const pageUrl = (adapterParams, pageParam) => {
  if (!pageParam) return null;

  const urlObject = new URL(`http://${adapterParams.request.headers.host}${adapterParams.request.url}`);
  urlObject.searchParams.set('page', pageParam);
  return urlObject.toString();
};

const contentPagination = adapterParams => ({
  page: paginatedContent(adapterParams),
  count: count(adapterParams),
  total_pages: totalPages(adapterParams),
  total_count: totalCount(adapterParams),
  previous_page: previousPage(adapterParams),
  current_page: adapterParams.page,
  next_page: nextPage(adapterParams),
  previous_page_link: pageUrl(adapterParams, previousPage(adapterParams)),
  next_page_link: pageUrl(adapterParams, nextPage(adapterParams))
});

const responseFormat = params => {
  if (typeof params.page !== 'number' || params.page <= 0) throw invalidPageNumberError();
  if (typeof params.limit !== 'number' || params.limit <= 0) throw invalidLimitNumberError();
  return contentPagination(params);
};

module.exports = { responseFormat };
