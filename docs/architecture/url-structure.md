# Vybecoding Platform URL Architecture

**Last Updated:** 2025-07-29  
**Version:** 1.0  
**Review Schedule:** Quarterly or after major routing changes

## Overview

The Vybecoding platform uses a hybrid URL architecture that combines path-based routing for core platform features and subdomain-based routing for native applications. This approach optimizes for both user experience and technical scalability.

## URL Structure Design Principles

1. **Clean and Memorable**: URLs should be intuitive and easy to share
2. **SEO Optimized**: Structure supports search engine indexing
3. **Scalable**: Can handle platform growth without breaking changes
4. **Secure**: Protected routes and reserved paths prevent conflicts
5. **Consistent**: Predictable patterns across the platform

## Main Website Structure (vybecoding.ai)

### Core Platform Routes

```
vybecoding.ai/                     # Landing page
vybecoding.ai/pricing              # Pricing tiers
vybecoding.ai/dashboard            # Member dashboard (protected)
vybecoding.ai/book                 # Booking/consultation page
vybecoding.ai/services             # Available services

# Authentication Routes
vybecoding.ai/sign-in              # Sign in page
vybecoding.ai/sign-up              # Sign up page
vybecoding.ai/sign-out             # Sign out handler

# App Showcase
vybecoding.ai/apps                 # Browse all apps
vybecoding.ai/apps/submit          # Submit new app
vybecoding.ai/apps/[app-id]        # Individual app details

# Guide Showcase  
vybecoding.ai/guides               # Browse all guides
vybecoding.ai/guides/submit        # Submit new guide
vybecoding.ai/guides/[guide-id]    # Individual guide details

# Legal & Support
vybecoding.ai/terms               # Terms of service
vybecoding.ai/privacy             # Privacy policy
vybecoding.ai/contact             # Contact form
vybecoding.ai/support             # Support center
```

### API Endpoints

```
# Versioned API Structure
vybecoding.ai/api/v1/              # Current stable API version

# Core API Routes
vybecoding.ai/api/v1/auth         # Authentication endpoints
vybecoding.ai/api/v1/users        # User management
vybecoding.ai/api/v1/apps         # App showcase API
vybecoding.ai/api/v1/guides       # Guide showcase API
vybecoding.ai/api/v1/members      # Member profiles

# Webhook Endpoints
vybecoding.ai/api/webhooks/stripe
vybecoding.ai/api/webhooks/cal
vybecoding.ai/api/webhooks/sentry

# Internal API Routes
vybecoding.ai/api/internal/       # Internal-only endpoints (protected)
```

## Member Showcase Architecture

### Member Profile Pattern (@username)

```
# Member Public Profile
vybecoding.ai/@johnsmith          # Member's main profile page
vybecoding.ai/@johnsmith/booking  # Booking/consultation page
vybecoding.ai/@johnsmith/apps     # Member's published apps
vybecoding.ai/@johnsmith/guides   # Member's published guides

# Member Sites/Projects
vybecoding.ai/@johnsmith/portfolio     # Custom portfolio site
vybecoding.ai/@johnsmith/blog         # Personal blog
vybecoding.ai/@johnsmith/[site-name]  # Any custom site
```

### Benefits of @username Pattern

- **Recognition**: Familiar pattern from social platforms
- **Branding**: Members can share memorable URLs
- **Flexibility**: Multiple sites per member without subdomains
- **SEO**: Clean URLs that rank well in search
- **Simplicity**: No DNS configuration needed

## Native App Subdomain Architecture

### Subdomain Pattern for Apps

```
# Core Native Apps
editor.vybecoding.ai               # Code editor app
mentor.vybecoding.ai               # Mentorship platform
academy.vybecoding.ai              # Learning management system
marketplace.vybecoding.ai          # App marketplace
studio.vybecoding.ai               # Design studio

# Member Native Apps (Future)
[app-name].apps.vybecoding.ai      # Third-party native apps
```

### Benefits of Subdomain Architecture

- **Isolation**: Complete separation from main platform
- **Performance**: Can be deployed independently
- **Security**: Separate cookies and storage
- **Professional**: Clean URLs for native apps
- **Scalability**: Unlimited subdomains on Vercel Pro

## Reserved and Protected Routes

### Platform Reserved Routes

These routes are reserved for platform functionality and cannot be used by members:

```
# Core Platform
/admin, /api, /auth, /dashboard, /settings
/sign-in, /sign-up, /sign-out, /logout

# Features
/apps, /guides, /members, /showcase
/pricing, /billing, /subscription, /upgrade

# Legal & Support  
/terms, /privacy, /legal, /contact, /support
/help, /docs, /documentation, /faq

# Technical
/webhooks, /_next, /public, /static
/.well-known, /robots.txt, /sitemap.xml

# Future Features
/blog, /forum, /community, /marketplace
/courses, /tutorials, /events, /jobs
```

### Username Restrictions

The following usernames are reserved:

```
# System Reserved
admin, root, system, api, app, apps
vybe, vybecoding, official, staff, team

# Common Routes
about, blog, help, info, mail, news
www, ftp, email, cdn, assets, media

# Technical Terms
undefined, null, void, test, demo
localhost, example, sample
```

## SEO Considerations

### URL Best Practices

1. **Descriptive URLs**: Use clear, keyword-rich paths
2. **Consistent Structure**: Maintain hierarchy across sections
3. **Canonical URLs**: Prevent duplicate content issues
4. **Clean Parameters**: Avoid complex query strings
5. **HTTPS Only**: All URLs redirect to secure versions

### Sitemap Structure

```xml
<urlset>
  <!-- Static Pages -->
  <url>
    <loc>https://vybecoding.ai/</loc>
    <priority>1.0</priority>
  </url>
  
  <!-- Dynamic Member Profiles -->
  <url>
    <loc>https://vybecoding.ai/@{username}</loc>
    <changefreq>weekly</changefreq>
  </url>
  
  <!-- App Showcase -->
  <url>
    <loc>https://vybecoding.ai/apps/{id}</loc>
    <changefreq>daily</changefreq>
  </url>
</urlset>
```

## Security Implications

### Route Protection Strategy

1. **Authentication Required**:
   - `/dashboard/*` - All dashboard routes
   - `/api/internal/*` - Internal API endpoints
   - `/admin/*` - Admin panel (if implemented)

2. **CORS Configuration**:
   - Main domain: Allow same-origin only
   - API endpoints: Configurable CORS headers
   - Subdomains: Isolated CORS policies

3. **Rate Limiting**:
   - API routes: 100 requests/minute
   - Authentication: 5 attempts/minute
   - Public pages: 1000 requests/minute

### Security Headers

```javascript
// Applied to all routes
{
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Content-Security-Policy": "default-src 'self'"
}
```

## Implementation Examples

### Next.js Routing Configuration

```javascript
// app/page.tsx - Landing page
// app/@[username]/page.tsx - Member profiles
// app/apps/[id]/page.tsx - App details
// app/api/v1/[...path]/route.ts - API routes

// Middleware for protected routes
export function middleware(request: NextRequest) {
  const protectedPaths = ['/dashboard', '/api/internal'];
  // Check authentication for protected paths
}
```

### Subdomain Handling

```javascript
// Vercel configuration for subdomains
{
  "rewrites": [
    {
      "source": "/:path*",
      "has": [
        {
          "type": "host",
          "value": "editor.vybecoding.ai"
        }
      ],
      "destination": "/apps/editor/:path*"
    }
  ]
}
```

## Migration Considerations

### From Prototype to Production

1. **Path Preservation**: Maintain URL structure from demo
2. **Redirects**: Set up 301 redirects for any changes
3. **Testing**: Verify all routes before deployment
4. **Documentation**: Update all references to URLs

### Future Expansion

The URL architecture supports future features:

- **Internationalization**: `vybecoding.ai/es/`, `/fr/`, etc.
- **API Versions**: `v2`, `v3` alongside `v1`
- **New Apps**: Additional subdomains as needed
- **Regional Domains**: `.com`, `.io` variants if needed

## Testing URL Structure

### Manual Testing Checklist

- [ ] All reserved routes return proper responses
- [ ] Member profiles load correctly with @username
- [ ] API versioning works as expected
- [ ] Subdomains resolve properly
- [ ] Protected routes require authentication
- [ ] SEO meta tags are present on all pages

### Automated Testing

```javascript
// Example Playwright test
test('URL structure validation', async ({ page }) => {
  // Test main routes
  await page.goto('https://vybecoding.ai');
  await expect(page).toHaveURL('https://vybecoding.ai/');
  
  // Test member profile
  await page.goto('https://vybecoding.ai/@testuser');
  await expect(page.locator('h1')).toContainText('testuser');
  
  // Test protected route
  await page.goto('https://vybecoding.ai/dashboard');
  await expect(page).toHaveURL(/sign-in/);
});
```

## Conclusion

The Vybecoding URL architecture balances simplicity, scalability, and security. By using path-based routing for the main platform and subdomains for native apps, we provide clean URLs that are easy to remember, share, and maintain while supporting future growth.