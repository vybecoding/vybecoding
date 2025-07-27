#!/bin/bash

# HashiCorp Vault Development Server Starter
# Usage: ./start-vault.sh

export PATH="$HOME/bin:$PATH"

echo "🔐 Starting HashiCorp Vault in development mode..."
echo "⚠️  Development mode is for testing only - NOT for production!"
echo ""

# Kill any existing vault processes
pkill -f "vault server" 2>/dev/null || true

# Start Vault in development mode in background
nohup vault server -dev > /home/happy/Projects/vybecoding/.solutions/vault.log 2>&1 &
VAULT_PID=$!

# Wait a moment for server to start
sleep 3

# Check if server started successfully
if ps -p $VAULT_PID > /dev/null; then
    echo "✅ Vault server started successfully!"
    echo "📍 Web UI: http://127.0.0.1:8200"
    echo "🔑 Process ID: $VAULT_PID"
    echo ""
    echo "To use Vault CLI, set these environment variables:"
    echo "export VAULT_ADDR='http://127.0.0.1:8200'"
    echo ""
    echo "📋 Root token and unseal key are in: ~/.vault-tokens"
    echo "🗒️  Server logs: /home/happy/Projects/vybecoding/.solutions/vault.log"
    echo ""
    echo "To stop Vault: pkill -f 'vault server'"
else
    echo "❌ Failed to start Vault server"
    echo "📋 Check logs: /home/happy/Projects/vybecoding/.solutions/vault.log"
    exit 1
fi