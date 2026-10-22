#!/usr/local/bin/node
/**
 * Persist contact submission into local SQLite database
 * Host: Mac mini M4
 * Path: ~/resume-ai/contacts.sqlite
 */

const sqlite3 = require('/usr/local/lib/node_modules/n8n/node_modules/sqlite3');
const path = require('path');
const os = require('os');

const dbPath = path.join(process.env.HOME || os.homedir() || '/Users/gezahorvath', 'resume-ai', 'contacts.sqlite');
const db = new sqlite3.Database(dbPath);

try {
  const rawArg = process.argv[2];
  if (!rawArg) {
    console.error(JSON.stringify({ status: 'error', message: 'No payload provided' }));
    process.exit(1);
  }

  // Support base64 encoded JSON string to prevent shell argument escaping issues
  let jsonStr = rawArg;
  if (/^[A-Za-z0-9+/=]+$/.test(rawArg) && (rawArg.startsWith('ey') || rawArg.length % 4 === 0)) {
    try {
      const decoded = Buffer.from(rawArg, 'base64').toString('utf8');
      if (decoded.startsWith('{')) {
        jsonStr = decoded;
      }
    } catch (_) {}
  }

  const payload = JSON.parse(jsonStr);

  // Ensure table exists
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      submission_id TEXT UNIQUE,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      company TEXT,
      role_or_interest TEXT,
      phone TEXT,
      message TEXT NOT NULL,
      source TEXT,
      ip_address TEXT,
      user_agent TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    const sql = `INSERT INTO contacts (
      submission_id, name, email, company, role_or_interest, phone, message, source, ip_address, user_agent, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))`;

    db.run(sql, [
      payload.submissionId || ('sub_' + Date.now()),
      payload.name || 'Anonymous',
      payload.email || 'no-email@example.com',
      payload.company || null,
      payload.roleOrInterest || null,
      payload.phone || null,
      payload.message || '',
      payload.source || 'portfolio-contact-form',
      payload.ip || null,
      payload.userAgent || null
    ], function(err) {
      if (err) {
        console.error(JSON.stringify({ status: 'error', error: err.message }));
        process.exit(1);
      }
      // Also append to contacts.jsonl audit log
      try {
        const fs = require('fs');
        const jsonlPath = path.join(process.env.HOME || os.homedir() || '/Users/gezahorvath', 'resume-ai', 'contacts.jsonl');
        fs.appendFileSync(jsonlPath, JSON.stringify({
          id: this.lastID,
          submissionId: payload.submissionId,
          name: payload.name,
          email: payload.email,
          company: payload.company,
          roleOrInterest: payload.roleOrInterest,
          phone: payload.phone,
          message: payload.message,
          source: payload.source,
          timestamp: new Date().toISOString()
        }) + '\n');
      } catch (fsErr) {
        console.warn('Could not append to JSONL:', fsErr.message);
      }

      console.log(JSON.stringify({
        status: 'success',
        id: this.lastID,
        submissionId: payload.submissionId
      }));
      db.close();
    });
  });
} catch (e) {
  console.error(JSON.stringify({ status: 'error', error: e.message }));
  process.exit(1);
}
