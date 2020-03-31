const nodePagination = require('..');

exports.testScenarios = [
  {
    testUrl: '/index',
    action: (req, res, content) => {
      res.writeHeader(200, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(nodePagination.paginate(content, req, {})));
    }
  },
  {
    testUrl: '/index_with_params',
    action: (req, res, content) => {
      res.writeHeader(200, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(nodePagination.paginate(content, req, { limit: 5, page: 3 })));
    }
  },
  {
    testUrl: '/index_page_exception',
    action: (req, res, content) => {
      try {
        nodePagination.paginate(content, req, { page: -1 });
      } catch (error) {
        res.writeHeader(500, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(error));
      }
    }
  },
  {
    testUrl: '/index_limit_exception',
    action: (req, res, content) => {
      try {
        nodePagination.paginate(content, req, { limit: -1 });
      } catch (error) {
        res.writeHeader(500, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(error));
      }
    }
  }
];
