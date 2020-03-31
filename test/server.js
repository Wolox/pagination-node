const http = require('http');
const { testScenarios } = require('./server_test_scenarios');

exports.createServer = (content = []) =>
  http.createServer((req, res) => {
    if (req.method === 'GET') {
      testScenarios.forEach(scenario => {
        if (req.url === scenario.testUrl) {
          scenario.action(req, res, content);
        }
      });
    }
    res.end();
  });
