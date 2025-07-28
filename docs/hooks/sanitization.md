# Environment Sanitization Hook

This hook provides security sanitization for environment variables passed between Claude Code hooks, preventing shell injection and path traversal attacks.

## Overview

The sanitization hook (`sanitize-env.sh`) automatically cleans environment variables used in hook chains to prevent:
- Shell injection attacks
- Path traversal attempts
- Null byte injection
- ANSI escape sequence injection
- DoS via extremely long inputs

## Location

`.claude/hooks/sanitize-env.sh`

## How It Works

### 1. String Sanitization
- Removes null bytes (`\x00`)
- Escapes single quotes for safe shell usage
- Strips ANSI escape sequences
- Truncates inputs over 10,000 characters

### 2. Path Validation
- Converts paths to absolute paths
- Ensures paths are within the project directory
- Blocks access to system files

### 3. Numeric Validation
- Ensures numeric fields contain only digits
- Sets invalid numbers to "0"

## Usage

The hook is automatically called in the PostToolUse chain for Bash commands:

```json
"PostToolUse": {
  "Bash": "export TOOL_NAME='{{toolName}}' ... && /path/to/sanitize-env.sh && ..."
}
```

## Environment Variables Sanitized

- `TOOL_NAME` - The name of the tool being used
- `TOOL_OUTPUT` - Output from the tool
- `FILE_PATH` - Path to files being operated on
- `AI_RESPONSE` - Response from AI
- `TIMESTAMP` - Timestamp of the operation
- `RESPONSE_LENGTH` - Length of the response (numeric)

## Security Features

### Shell Injection Protection
```bash
# Input: test'; echo 'INJECTED
# Output: test'\'' echo '\''INJECTED
```

### Path Traversal Protection
```bash
# Input: /etc/passwd
# Output: (empty - blocked)
```

### ANSI Escape Removal
```bash
# Input: text[31mRED[0m
# Output: textRED
```

## Testing

Run the test script to verify sanitization:

```bash
# Create test script
cat > test-sanitize.sh << 'EOF'
#!/bin/bash
export TOOL_NAME="test'; echo 'injected"
export FILE_PATH="/etc/passwd"
source .claude/hooks/sanitize-env.sh
echo "Sanitized TOOL_NAME: $TOOL_NAME"
echo "Sanitized FILE_PATH: $FILE_PATH"
EOF

chmod +x test-sanitize.sh
./test-sanitize.sh
```

## Integration

The sanitization hook is integrated into the hook chain and runs automatically. It sets `HOOKS_SANITIZED=true` when complete.

## Troubleshooting

1. **Variables appear empty**: Ensure variables are exported before sourcing the script
2. **Path validation fails**: Check that git is available and you're in a git repository
3. **Long inputs truncated**: This is intentional - inputs over 10K chars are truncated

## Best Practices

1. Always include this hook early in any hook chain that processes user input
2. Don't rely solely on sanitization - validate inputs in your scripts too
3. Test with malicious inputs during development
4. Monitor blocked attempts in logs