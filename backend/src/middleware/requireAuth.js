'use strict';

// TEMP — Phase 3 will replace the body of this function with JWT verification.
// The req.user shape stays the same ({ id, email }), so controllers don't change.
// For now: caller passes their user UUID via the X-Dev-User-Id header.

const { query } = require('../db/pool');

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

async function requireAuth(req, res, next) {
  const id = req.header('X-Dev-User-Id');
  if (!id || !UUID_RE.test(id)) {
    return res.status(401).json({
      error: 'Unauthorized — provide a valid X-Dev-User-Id header (dev shim, Phase 3 will use JWT)',
    });
  }
  try {
    const { rows } = await query('SELECT id, email FROM users WHERE id = $1', [id]);
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Unauthorized — user not found' });
    }
    req.user = rows[0];
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = { requireAuth, UUID_RE };
