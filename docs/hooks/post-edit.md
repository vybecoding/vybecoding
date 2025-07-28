# Post-Edit Sanitize Hook

## Status: ✅ ACTIVE

The post-edit sanitize hook is configured and running in PostToolUse hooks for Edit and Write operations.

## Overview

This hook automatically scans edited files for potential XSS vulnerabilities and dangerous patterns, providing real-time security feedback during development.

## Location

`.claude/hooks/post-edit-sanitize.js`

## Configuration

Configured in `.claude/settings.json` in PostToolUse hooks:
- Runs after Edit/MultiEdit operations
- Runs after Write operations
- Only checks HTML, JS, TS, JSX, TSX files

## Security Features

### Dangerous Patterns Detected

1. **innerHTML without DOMPurify**
   - Warns when innerHTML is used without sanitization
   - Suggests using DOMPurify.sanitize()

2. **insertAdjacentHTML**
   - Detects potential XSS via HTML insertion
   - Recommends sanitization

3. **document.write**
   - Flags as potential XSS risk
   - Suggests safer alternatives

4. **eval() usage**
   - Major security risk warning
   - Strongly discouraged

5. **Function constructor**
   - Potential security risk
   - Similar risks to eval()

### Path Security

- Validates file paths are within project directory
- Prevents path traversal attempts
- Blocks access to system files
- Limits file size to 10MB to prevent DoS

## Output Example

```
🔒 Security Check for example.js:
⚠️  Found innerHTML usage - use DOMPurify.sanitize() first
⚠️  Found eval() - major security risk
✅ Use DOMPurify.sanitize() for HTML content
✅ Use validator.js for input validation
✅ Use safe-compare for token comparisons
```

## Best Practices

1. Always sanitize user input before rendering
2. Use DOMPurify for HTML sanitization
3. Use validator.js for input validation
4. Avoid eval() and Function constructor
5. Use safe alternatives to innerHTML

## Last Tested

January 28, 2025 - Detected XSS vulnerabilities correctly, configured in settings.json