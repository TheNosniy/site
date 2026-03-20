// api/wakatime.js
const https = require('https');

const WAKA_KEY = 'waka_917a3b4a-789f-4bcf-bb15-d0a0af903fd4';

module.exports = function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const today = new Date().toISOString().split('T')[0];
  const encoded = Buffer.from(WAKA_KEY).toString('base64');

  const options = {
    hostname: 'api.wakatime.com',
    path: `/api/v1/users/current/summaries?start=${today}&end=${today}`,
    method: 'GET',
    headers: {
      'Authorization': 'Basic ' + encoded,
      'Content-Type': 'application/json'
    }
  };

  const request = https.request(options, function(response) {
    let data = '';

    response.on('data', function(chunk) {
      data += chunk;
    });

    response.on('end', function() {
      try {
        const json = JSON.parse(data);
        res.status(200).json(json);
      } catch (e) {
        res.status(500).json({ error: 'Parse error', raw: data });
      }
    });
  });

  request.on('error', function(err) {
    res.status(500).json({ error: err.message });
  });

  request.end();
};
