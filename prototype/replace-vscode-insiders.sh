#!/bin/bash

# Replace Snap VS Code Insiders with APT version

echo "=== Replacing Snap VS Code Insiders with APT version ==="
echo ""

# Step 1: Remove Snap version
echo "Step 1: Removing Snap version of VS Code Insiders..."
sudo snap remove code-insiders

# Step 2: Add Microsoft GPG key
echo ""
echo "Step 2: Adding Microsoft GPG key..."
wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg
sudo install -o root -g root -m 644 packages.microsoft.gpg /etc/apt/trusted.gpg.d/

# Step 3: Add VS Code repository
echo ""
echo "Step 3: Adding VS Code repository..."
sudo sh -c 'echo "deb [arch=amd64,arm64,armhf signed-by=/etc/apt/trusted.gpg.d/packages.microsoft.gpg] https://packages.microsoft.com/repos/code stable main" > /etc/apt/sources.list.d/vscode.list'

# Step 4: Update package cache
echo ""
echo "Step 4: Updating package cache..."
sudo apt update

# Step 5: Install VS Code Insiders
echo ""
echo "Step 5: Installing VS Code Insiders via APT..."
sudo apt install -y code-insiders

# Step 6: Clean up
echo ""
echo "Step 6: Cleaning up..."
rm packages.microsoft.gpg

# Step 7: Prevent snap from reinstalling
echo ""
echo "Step 7: Preventing snap from reinstalling VS Code Insiders..."
sudo snap refresh --hold code-insiders 2>/dev/null || echo "Note: Could not hold snap refresh (not critical)"

# Step 8: Verify installation
echo ""
echo "Step 8: Verifying installation..."
echo "VS Code Insiders version:"
code-insiders --version

echo ""
echo "=== Installation complete! ==="
echo "You can now launch VS Code Insiders with: code-insiders"