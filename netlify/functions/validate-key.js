// Beta-key validation for the Flywall download page.
//
// Valid keys are stored in the BETA_KEYS environment variable on Netlify
// (Site settings > Environment variables) as a comma-separated list, e.g.
//   BETA_KEYS = FLY-1A2B-3C4D-5E6F, FLY-9Z8Y-7X6W-5V4U
// Keys are matched case-insensitively after trimming whitespace.
//
// The key list never reaches the browser — only a { valid: true|false }
// verdict is returned.

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return json(405, { valid: false, error: 'Method not allowed' });
  }

  let key = '';
  try {
    key = String((JSON.parse(event.body || '{}').key || '')).trim();
  } catch (_) {
    return json(400, { valid: false, error: 'Malformed request' });
  }

  if (!key) {
    return json(400, { valid: false, error: 'No key provided' });
  }

  const validKeys = (process.env.BETA_KEYS || '')
    .split(',')
    .map((k) => k.trim().toLowerCase())
    .filter(Boolean);

  const isValid = validKeys.includes(key.toLowerCase());

  return json(200, { valid: isValid });
};

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
    body: JSON.stringify(body),
  };
}
