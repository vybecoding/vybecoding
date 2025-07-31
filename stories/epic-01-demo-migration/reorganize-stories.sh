#!/bin/bash

# Reorganize DEMO story files according to new numbering system
# This script renames all story files to follow the logical flow

cd /home/happy/Projects/vybecoding/stories/epic-01-demo-migration

# Create backup first
echo "Creating backup..."
mkdir -p backup
cp DEMO-*.md backup/

# Delete home-alt as it's not needed
rm -f DEMO-034-home-alt.md

# Rename files to temporary names first to avoid conflicts
echo "Renaming to temporary files..."

# Core Flow
mv DEMO-001-home-landing.md TEMP-001-home.md
mv DEMO-005-sign-in.md TEMP-002-sign-in.md
mv DEMO-006-sign-up.md TEMP-003-sign-up.md
mv DEMO-007-forgot-password.md TEMP-004-forgot-password.md

# Guides Flow
mv DEMO-010-guides-main.md TEMP-005-guides-main.md
mv DEMO-004-guides-browse.md TEMP-006-guides-browse.md
mv DEMO-011-guides-submit.md TEMP-007-guides-submit.md
# Note: guides-submit steps don't exist as separate files, they're part of the main submit
mv DEMO-022-guide-detail.md TEMP-008-guide-detail.md
mv DEMO-023-guide-detail-unlocked.md TEMP-009-guide-detail-unlocked.md
mv DEMO-024-guide-view.md TEMP-010-guide-view.md

# Apps Flow
mv DEMO-008-apps-main.md TEMP-011-apps-main.md
mv DEMO-003-apps-browse.md TEMP-012-apps-browse.md
mv DEMO-009-apps-submit.md TEMP-013-apps-submit.md
# Note: apps-submit steps don't exist as separate files, they're part of the main submit
mv DEMO-041-app-native-detail.md TEMP-014-app-native-detail.md
mv DEMO-040-app-member-preview.md TEMP-015-app-member-preview.md

# Community
mv DEMO-032-members-directory.md TEMP-016-members.md

# Profile
mv DEMO-029-profile-main.md TEMP-017-profile-main.md
mv DEMO-030-profile-info.md TEMP-018-profile-info.md
mv DEMO-031-profile-booking.md TEMP-019-profile-booking.md

# Featured
mv DEMO-033-featured-content.md TEMP-020-featured.md

# Dashboard
mv DEMO-002-dashboard-home.md TEMP-021-dashboard-main.md
mv DEMO-021-dashboard-review.md TEMP-022-dashboard-review.md
mv DEMO-020-dashboard-mentorship.md TEMP-023-dashboard-mentorship.md
mv DEMO-023-dashboard-analytics.md TEMP-024-dashboard-analytics.md
mv DEMO-013-dashboard-profile.md TEMP-025-dashboard-profile.md
mv DEMO-014-dashboard-settings.md TEMP-026-dashboard-settings.md

# Settings sub-pages
mv DEMO-015-settings-profile.md TEMP-027-settings-profile.md
mv DEMO-016-settings-account.md TEMP-028-settings-account.md
mv DEMO-017-settings-privacy.md TEMP-029-settings-privacy.md
mv DEMO-018-settings-notifications.md TEMP-030-settings-notifications.md
mv DEMO-019-settings-billing.md TEMP-031-settings-billing.md

# Legal/Support pages
mv DEMO-035-about.md TEMP-032-about.md
mv DEMO-038-pricing.md TEMP-033-pricing.md
mv DEMO-036-help.md TEMP-034-help.md
mv DEMO-037-support.md TEMP-035-support.md
mv DEMO-042-terms.md TEMP-036-terms.md
mv DEMO-043-privacy-policy.md TEMP-037-privacy-policy.md
mv DEMO-044-licenses.md TEMP-038-licenses.md
mv DEMO-045-cookies.md TEMP-039-cookies.md

# Special pages
mv DEMO-039-notifications.md TEMP-040-notifications.md
mv DEMO-046-design-system-showcase.md TEMP-041-design-system-showcase.md

# Now rename from TEMP to DEMO with new numbers
echo "Applying new numbering..."

for file in TEMP-*.md; do
    new_name=$(echo $file | sed 's/TEMP-/DEMO-/')
    mv "$file" "$new_name"
done

# Update the content of each file to reflect new DEMO numbers
echo "Updating file contents..."

for file in DEMO-*.md; do
    demo_num=$(echo $file | grep -o 'DEMO-[0-9]\+' | head -1)
    sed -i "1s/DEMO-[0-9]\+:/$demo_num:/" "$file"
done

echo "Reorganization complete!"
echo ""
echo "New structure:"
echo "DEMO-001 to DEMO-004: Authentication flow (Home, Sign-in, Sign-up, Forgot Password)"
echo "DEMO-005 to DEMO-010: Guides flow"
echo "DEMO-011 to DEMO-015: Apps flow"
echo "DEMO-016 to DEMO-020: Community/Profile/Featured"
echo "DEMO-021 to DEMO-031: Dashboard and Settings"
echo "DEMO-032 to DEMO-041: Legal/Support/Special pages"