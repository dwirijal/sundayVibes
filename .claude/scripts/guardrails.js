// PreToolUse guardrail: block obvious secret leaks before tool runs.
// Reads hook JSON on stdin. Exits non-zero to block.
let input = '';
process.stdin.on('data', chunk => (input += chunk));
process.stdin.on('end', () => {
  try {
    const payload = JSON.parse(input);
    const text = JSON.stringify(payload.tool_input || {});
    const patterns = [
      /(?:sk-|pk-)[a-zA-Z0-9]{20,}/i,         // API keys
      /npg_[A-Za-z0-9_]{20,}/,                // Neon passwords
      /[A-Za-z0-9_-]{32,}@ep-[a-z0-9-]+/i,    // Neon conn strings w/ user:pass
      /AKIA[0-9A-Z]{16}/,                      // AWS keys
      /ghp_[A-Za-z0-9]{30,}/                   // GitHub PATs
    ];
    for (const re of patterns) {
      if (re.test(text)) {
        console.error('[guardrails] Blocked: possible secret in tool input.');
        process.exit(2);
      }
    }
  } catch {
    // Non-blocking on parse errors; don't break the hook.
  }
  process.exit(0);
});
