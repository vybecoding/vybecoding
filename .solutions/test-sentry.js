#!/usr/bin/env node

// Simple Sentry API test
const token = process.env.SENTRY_AUTH_TOKEN;

if (!token) {
  console.error('SENTRY_AUTH_TOKEN not set');
  process.exit(1);
}

async function fetchSentryIssues() {
  try {
    const response = await fetch(
      'https://sentry.io/api/0/projects/vybecoding/vybecoding/issues/?statsPeriod=7d',
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      console.error(`Error: ${response.status} ${response.statusText}`);
      return;
    }

    const issues = await response.json();
    
    if (issues.length === 0) {
      console.log('No issues found in the last 7 days');
      return;
    }

    console.log(`Found ${issues.length} issues:\n`);
    
    issues.slice(0, 5).forEach(issue => {
      console.log(`- ${issue.title}`);
      console.log(`  Level: ${issue.level}, Count: ${issue.count}`);
      console.log(`  ${issue.permalink}\n`);
    });
  } catch (error) {
    console.error('Failed to fetch issues:', error.message);
  }
}

fetchSentryIssues();