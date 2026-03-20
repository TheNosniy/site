// api/wakatime.js — Vercel Serverless Function
// Проксирует запрос к WakaTime API, обходя CORS

const WAKA_KEY = 'waka_f34af810-31e5-4d81-9f82-c8cfd1977f99';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

    const url =
      `https://wakatime.com/api/v1/users/current/summaries` +
      `?start=${today}&end=${today}&api_key=${WAKA_KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
      return res.status(response.status).json({ error: 'WakaTime API error' });
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
