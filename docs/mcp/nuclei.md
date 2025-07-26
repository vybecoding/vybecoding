# Nuclei - Automated Vulnerability Detection Guide

## Overview
Nuclei is a fast, template-based vulnerability scanner that helps identify security issues in web applications and infrastructure.

## Installation
```bash
# Nuclei is installed at: ~/.local/bin/nuclei
# Add to PATH if not already done:
export PATH=$HOME/.local/bin:$PATH

# Verify installation:
nuclei -version
```

## Basic Usage

### Update Templates (Important!)
```bash
# Update to latest vulnerability templates
nuclei -update-templates
```

### Scan Single Target
```bash
# Basic scan with all templates
nuclei -u https://example.com

# Scan with specific severity levels
nuclei -u https://example.com -severity critical,high,medium

# Technology detection only
nuclei -u https://example.com -t ~/nuclei-templates/http/technologies/
```

### Scan Multiple Targets
```bash
# From file
nuclei -list targets.txt

# Multiple URLs
echo -e "https://site1.com\nhttps://site2.com" | nuclei
```

## Common Scanning Scenarios

### 1. Quick Security Assessment
```bash
# Focus on critical and high severity issues
nuclei -u https://target.com -severity critical,high -stats
```

### 2. Technology Stack Detection
```bash
# Identify technologies used
nuclei -u https://target.com -t ~/nuclei-templates/http/technologies/ -silent
```

### 3. Misconfiguration Check
```bash
# Check for common misconfigurations
nuclei -u https://target.com -t ~/nuclei-templates/misconfiguration/
```

### 4. Exposed Files/Paths
```bash
# Look for exposed sensitive files
nuclei -u https://target.com -t ~/nuclei-templates/http/exposures/
```

### 5. CVE Scanning
```bash
# Scan for known CVEs
nuclei -u https://target.com -t ~/nuclei-templates/http/cves/
```

## Output Options

### Save Results
```bash
# JSON output
nuclei -u https://target.com -json -o results.json

# Markdown output
nuclei -u https://target.com -markdown-export reports/

# Simple text
nuclei -u https://target.com -o results.txt
```

### Filtering Output
```bash
# Silent mode (only show findings)
nuclei -u https://target.com -silent

# No color output
nuclei -u https://target.com -nc

# Show statistics
nuclei -u https://target.com -stats
```

## Rate Limiting & Performance

```bash
# Limit requests per second
nuclei -u https://target.com -rate-limit 10

# Set timeout
nuclei -u https://target.com -timeout 5

# Control concurrency
nuclei -u https://target.com -c 25 -bulk-size 25
```

## Safety Tips

1. **Always get permission** before scanning targets you don't own
2. **Use rate limiting** to avoid overwhelming servers
3. **Start with low severity** scans to understand impact
4. **Review templates** before running against production
5. **Monitor scan progress** with `-stats` flag

## Example Workflow for vybecoding.ai

```bash
# 1. Update templates
nuclei -update-templates

# 2. Technology detection
nuclei -u https://vybecoding.ai -t ~/nuclei-templates/http/technologies/ -silent

# 3. Basic security scan (rate-limited)
nuclei -u https://vybecoding.ai -severity high,critical -rate-limit 10 -stats

# 4. Check for misconfigurations
nuclei -u https://vybecoding.ai -t ~/nuclei-templates/misconfiguration/ -silent

# 5. Generate report
nuclei -u https://vybecoding.ai -severity all -markdown-export ./security-reports/
```

## Integration with Development

### Pre-deployment Check
```bash
#!/bin/bash
# Add to CI/CD pipeline
echo "Running security scan..."
nuclei -u https://staging.vybecoding.ai -severity critical,high -silent
if [ $? -eq 0 ]; then
    echo "No critical issues found"
else
    echo "Security issues detected!"
    exit 1
fi
```

### Regular Monitoring
```bash
# Create a cron job for weekly scans
0 0 * * 0 nuclei -u https://vybecoding.ai -severity all -o /logs/weekly-scan-$(date +%Y%m%d).txt
```

## Troubleshooting

### Templates Not Loading
```bash
# Re-download templates
rm -rf ~/nuclei-templates
nuclei -update-templates
```

### Slow Scans
```bash
# Reduce template count
nuclei -u target.com -t ~/nuclei-templates/http/cves/2024/

# Increase timeout
nuclei -u target.com -timeout 10
```

### Permission Errors
```bash
# Ensure nuclei is executable
chmod +x ~/.local/bin/nuclei
```

## Resources

- Official Docs: https://docs.nuclei.sh
- Template Hub: https://github.com/projectdiscovery/nuclei-templates
- Community: https://discord.gg/projectdiscovery

Remember: Always use responsibly and only scan targets you have permission to test!