#!/bin/bash

# Sentry Error Monitor for TRAIL System
# This script can be called by hooks to check Sentry for new errors

SENTRY_AUTH_TOKEN="${SENTRY_AUTH_TOKEN}"
SENTRY_ORG="vybecoding"
SENTRY_PROJECT="vybecoding"

# Function to fetch recent issues from Sentry
fetch_sentry_issues() {
    if [ -z "$SENTRY_AUTH_TOKEN" ]; then
        echo "SENTRY_AUTH_TOKEN not set"
        return 1
    fi

    # Get issues from last hour
    curl -s "https://sentry.io/api/0/projects/${SENTRY_ORG}/${SENTRY_PROJECT}/issues/" \
        -H "Authorization: Bearer ${SENTRY_AUTH_TOKEN}" \
        -G --data-urlencode "statsPeriod=1h" \
        --data-urlencode "query=is:unresolved" | \
        jq -r '.[] | "\(.title) - \(.count) events - \(.permalink)"'
}

# Function to check for critical errors
check_critical_errors() {
    local issues=$(fetch_sentry_issues)
    
    if echo "$issues" | grep -E "(TypeError|ReferenceError|Critical)" > /dev/null; then
        echo "CRITICAL: Found critical errors in Sentry!"
        echo "$issues" | grep -E "(TypeError|ReferenceError|Critical)"
        
        # Could trigger TRAIL escalation here
        # Or notify via webhook
        return 1
    fi
    
    return 0
}

# Main execution
case "${1:-}" in
    "fetch")
        fetch_sentry_issues
        ;;
    "check")
        check_critical_errors
        ;;
    *)
        echo "Usage: $0 {fetch|check}"
        exit 1
        ;;
esac