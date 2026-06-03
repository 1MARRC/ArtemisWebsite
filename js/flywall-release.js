/**
 * Flywall release — single source of truth for the installer download.
 *
 * To ship a new build, bump FLYWALL_RELEASE_VERSION below. Nothing else
 * changes: the URL, SHA256 link, and every UI label derive from it.
 *
 * Release URL pattern:
 *   https://github.com/1MARRC/flywall-releases/releases/download/v<VERSION>/Flywall_<VERSION>_x64-setup.exe
 *
 * This file is dependency-free and dual-mode so the SAME constant feeds both:
 *   - the browser  → download.html loads it as `window.FlywallRelease`
 *   - the backend  → the Netlify verify function require()s it server-side
 */
(function (root, factory) {
  var cfg = factory();
  if (typeof module !== 'undefined' && module.exports) { module.exports = cfg; }
  if (root) { root.FlywallRelease = cfg; }
})(typeof self !== 'undefined' ? self : this, function () {
  // ── bump this one line per release ──
  var FLYWALL_RELEASE_VERSION = '0.2.0-rc9';

  var FLYWALL_INSTALLER_SIZE_MB = 30; // approximate, for the UI label only
  var FLYWALL_INSTALLER_URL =
    'https://github.com/1MARRC/flywall-releases/releases/download/v' +
    FLYWALL_RELEASE_VERSION +
    '/Flywall_' + FLYWALL_RELEASE_VERSION + '_x64-setup.exe';
  var FLYWALL_INSTALLER_SHA256_URL = FLYWALL_INSTALLER_URL + '.sha256';

  return {
    FLYWALL_RELEASE_VERSION: FLYWALL_RELEASE_VERSION,
    FLYWALL_INSTALLER_SIZE_MB: FLYWALL_INSTALLER_SIZE_MB,
    FLYWALL_INSTALLER_URL: FLYWALL_INSTALLER_URL,
    FLYWALL_INSTALLER_SHA256_URL: FLYWALL_INSTALLER_SHA256_URL,
  };
});
