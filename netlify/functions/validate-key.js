// Beta-key validation for the Flywall download page.
//
// Valid keys are stored in the BETA_KEYS environment variable on Netlify
// (Site settings > Environment variables) as a comma-separated list, e.g.
//   BETA_KEYS = FLY-1A2B-3C4D-5E6F, FLY-9Z8Y-7X6W-5V4U
// Keys are matched case-insensitively after trimming whitespace.
//
// The key list never reaches the browser. An invalid key returns
// { valid: false }; a valid key additionally returns the installer URL and
// version, pulled from js/flywall-release.js (the single source of truth).

const release = require('../../js/flywall-release.js');

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

  if (!isValid) {
    return json(200, { valid: false });
  }

  // Valid key → track and hand back the download details.
  console.log(`[DOWNLOAD_TRACKING] Successful beta key validation: ${key}`);

  // Optional: Send a ping to Discord/Slack if a webhook URL is configured
  if (process.env.WEBHOOK_URL) {
    try {
      // We MUST await the fetch in serverless functions, otherwise the function
      // terminates before the network request is actually sent out.
      await fetch(process.env.WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: `🎉 **New Download!** Beta key \`${key}\` was just used.` })
      });
    } catch (e) {
      console.error('Webhook error:', e);
    }
  }

  return json(200, {
    valid: true,
    version: release.FLYWALL_RELEASE_VERSION,
    url: release.FLYWALL_INSTALLER_URL,
    sizeMb: release.FLYWALL_INSTALLER_SIZE_MB,
    sha256Url: release.FLYWALL_INSTALLER_SHA256_URL,
  });
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
