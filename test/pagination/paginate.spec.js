/* eslint-disable indent */

const request = require('supertest');
const { defaultPagParams } = require('../helpers/default_pag_params');
const { createServer } = require('../server');
const { customPagParams } = require('../helpers/custom_pag_params');
const factory = require('../factory/fake_model');

const testUrls = {
  index: '/index',
  indexWithParams: '/index_with_params',
  indexPageException: '/index_page_exception',
  indexLimitException: '/index_limit_exception'
};
const makeRequest = (url, content, method = 'get') => request(createServer(content))[method](url);

describe.each`
  description                             | testUrl                     | minSlice | maxSlice
  ${'default pagination without options'} | ${testUrls.index}           | ${0}     | ${25}
  ${'custom pagination with options'}     | ${testUrls.indexWithParams} | ${10}    | ${15}
`('Request $description passed', ({ description, testUrl, minSlice, maxSlice }) => {
  let fakeModels = undefined;
  let response = undefined;
  let responseBody = undefined;
  let responsePage = undefined;
  let pagParams = undefined;

  beforeAll(async () => {
    fakeModels = factory.fakeModels(30);
    response = await makeRequest(testUrl, fakeModels);
    responseBody = response.body;
    responsePage = responseBody.page;
    pagParams = description.includes('default')
      ? defaultPagParams(response.request)
      : customPagParams(response.request);
  });

  it('responds with proper pagination params', () => {
    expect(response.statusCode).toBe(200);
    expect(responseBody.page.length).toBe(pagParams.page_count);
    expect(responseBody.count).toBe(pagParams.count);
    expect(responseBody.total_count).toBe(pagParams.total_count);
    expect(responseBody.total_pages).toBe(pagParams.total_pages);
    expect(responseBody.previous_page).toBe(pagParams.previous_page);
    expect(responseBody.next_page).toBe(pagParams.next_page);
    expect(responseBody.previous_page_url).toBe(pagParams.previous_page_url);
    expect(responseBody.next_page_url).toBe(pagParams.next_page_url);
  });

  it('responds with a valid page', () => {
    const expectedList = fakeModels.slice(minSlice, maxSlice);
    expect(responsePage).toStrictEqual(expectedList);
  });
});

describe('Request pagination with invalid params', () => {
  it.each`
    param      | testUrl
    ${'page'}  | ${testUrls.indexPageException}
    ${'limit'} | ${testUrls.indexLimitException}
  `(
    'responds with an error when an invalid $param is sent in options to paginate method',
    async ({ testUrl }) => {
      const response = await makeRequest(testUrl);
      expect(response.statusCode).toBe(500);
      expect(response.serverError).toBe(true);
      expect(response.error).toBeInstanceOf(Error);
    }
  );
});
