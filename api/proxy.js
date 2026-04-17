export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) return res.status(400).json({ error: 'Missing url parameter' });
  if (!url.startsWith('https://ec.europa.eu/tools/eudamed/'))
    return res.status(403).json({ error: 'Only EUDAMED URLs are allowed' });

  try {
    const upstream = await fetch(url, { headers: { Accept: 'application/json' } });
    const data = await upstream.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(upstream.status).json(data);
  } catch (err) {
    res.status(502).json({ error: err.message });
  }
}
