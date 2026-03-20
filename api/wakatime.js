// api/wakatime.js
const WAKA_KEY = 'waka_f34af810-31e5-4d81-9f82-c8cfd1977f99';

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const today = new Date().toISOString().split('T')[0];
    const url = `https://wakatime.com/api/v1/users/current/summaries?start=${today}&end=${today}`;

    // WakaTime требует Basic Auth: base64(apikey:)
    const encoded = Buffer.from(WAKA_KEY + ':').toString('base64');

    const response = await fetch(url, {
      headers: {
        'Authorization': 'Basic ' + encoded
      }
    });

    const data = await response.json();
    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
