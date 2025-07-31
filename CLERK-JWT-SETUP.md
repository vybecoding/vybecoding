# Clerk JWT Template Setup for Convex

## ⚠️ Required Setup

You're getting the error "No JWT template exists with name: convex" because Clerk needs a JWT template to communicate with Convex.

## Steps to Fix:

### 1. Go to Clerk Dashboard
Navigate to: https://dashboard.clerk.com

### 2. Select Your Application
Choose your "vybecoding" application (or whatever you named it)

### 3. Navigate to JWT Templates
In the left sidebar, look for:
- **Sessions** → **JWT Templates**

### 4. Create New Template
Click **"+ New template"**

### 5. Configure the Template
Use these exact settings:

**Name:** `convex` (must be lowercase, exactly as shown)

**Claims:** (paste this JSON)
```json
{
  "aud": "convex",
  "iat": "{{time}}",
  "iss": "https://clerk.com",
  "sub": "{{user.id}}"
}
```

**Lifetime:** 60 (default is fine)

### 6. Save the Template
Click **"Save"** button

## Test It Works

After creating the JWT template:

1. Go to http://localhost:3000/guides
2. Make sure you're signed in
3. Look for the orange "Development Mode" box
4. Click "Create Test Guide"
5. The test guide should be created successfully!

## Manual Test Guide URL

Once you have existing guides, you can test the guide pages directly:

### Test URLs:
- **Browse Guides:** http://localhost:3000/guides
- **Guide Detail:** http://localhost:3000/guides/[slug]
- **Guide Unlocked:** http://localhost:3000/guides/[slug]/unlocked
- **Guide View:** http://localhost:3000/guides/[slug]/view

Replace `[slug]` with an actual guide slug like `test-guide-placeholder`

## Alternative: Use Existing Guides

If you already have guides in your database from the guide submission flow, you can use those for testing instead of creating a test guide.

## Troubleshooting

If you still see the JWT error after creating the template:
1. Sign out and sign back in
2. Clear your browser cache
3. Restart the Next.js dev server
4. Make sure the template name is exactly `convex` (lowercase)

The JWT template is essential for Clerk and Convex to work together!