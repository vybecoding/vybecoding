# Playwright MCP

## Status: ✅ CONFIGURED

Browsers are installed and server is configured.

## Overview

The Playwright MCP server enables Claude to perform browser automation, visual testing, and web scraping through the Playwright browser automation framework.

## Configuration

Located in `.claude/config/mcp-settings.json`:
```json
"playwright": {
  "command": "npx",
  "args": ["@modelcontextprotocol/server-playwright"],
  "env": {
    "PLAYWRIGHT_BROWSERS_PATH": "${HOME}/.cache/ms-playwright"
  }
}
```

## Features

### Browser Automation
- Navigate to URLs
- Interact with page elements
- Fill forms and click buttons
- Take screenshots
- Record videos

### Testing Capabilities
- Visual regression testing
- End-to-end testing
- Cross-browser testing
- Mobile viewport testing
- Accessibility testing

### Web Scraping
- Extract page content
- Download resources
- Handle dynamic content
- Work with SPAs
- Bypass basic anti-scraping

## Supported Browsers

All browsers installed in `~/.cache/ms-playwright`:
- Chromium
- Firefox
- WebKit (Safari)

## Common Use Cases

1. **Testing**
   - Automated UI testing
   - Visual regression checks
   - User flow validation

2. **Debugging**
   - Reproduce user issues
   - Capture error states
   - Network inspection

3. **Data Collection**
   - Scrape dynamic content
   - Monitor website changes
   - Extract structured data

## Integration with TRAIL

Playwright MCP integrates with the TRAIL system for:
- Visual debugging of test failures
- Screenshot capture of errors
- Session recording with traces
- Network request logging

## Debug Artifacts

When used for debugging, creates:
- `session_*/` - Debug sessions
- `screenshots/` - Error screenshots
- `traces/` - Full execution traces
- `videos/` - Session recordings

## Usage

Claude can use Playwright when you ask to:
- Test web applications
- Debug visual issues
- Scrape web content
- Automate browser tasks
- Capture screenshots

## Best Practices

1. Use headless mode for speed
2. Set appropriate timeouts
3. Handle dynamic content properly
4. Clean up browser instances
5. Use wait conditions effectively

## Last Tested

January 28, 2025 - Browsers verified installed at `~/.cache/ms-playwright`