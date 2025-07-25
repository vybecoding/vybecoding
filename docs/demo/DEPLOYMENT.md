# Deployment Guide

Complete deployment guide for VybeCoding.ai demo with multiple hosting options.

## 🚀 Quick Deploy

### Option 1: Modern Build (Recommended)

```bash
# Install dependencies and build
npm install
npm run build

# Deploy dist/ folder to your hosting platform
```

### Option 2: Zero-Dependency Build

```bash
# No npm install required - uses legacy build system
npm run build:legacy

# Deploy dist/ folder
```

## 📁 Build Output

Both build systems create a `dist/` folder containing:

- `index.html` - Optimized HTML with inlined critical CSS
- `assets/js/` - Minified JavaScript bundles
- `assets/css/` - Minified stylesheets
- `assets/img/` - Optimized images and icons

## 🌐 Hosting Platforms

### Netlify

```bash
# Build command
npm run build

# Publish directory
dist

# Optional: Add netlify.toml
```

**netlify.toml**
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[context.deploy-preview]
  command = "npm run build"
```

### Vercel

```bash
# Build command
npm run build

# Output directory
dist

# Optional: Add vercel.json
```

**vercel.json**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### GitHub Pages

1. **Build locally and push to gh-pages branch:**

```bash
npm run build
# Push dist/ contents to gh-pages branch
```

2. **GitHub Actions (automatic):**

**.github/workflows/deploy.yml**
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build
        run: npm run build
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Initialize project
firebase init hosting

# Build and deploy
npm run build
firebase deploy
```

**firebase.json**
```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "/assets/**",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=31536000, immutable"
          }
        ]
      }
    ]
  }
}
```

### AWS S3 + CloudFront

```bash
# Build project
npm run build

# Upload to S3 bucket
aws s3 sync dist/ s3://your-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR-DISTRIBUTION-ID --paths "/*"
```

## 🔧 Environment Configuration

### Production Environment Variables

Create `.env.production` (not committed to git):

```env
NODE_ENV=production
VITE_APP_VERSION=1.0.0
VITE_BUILD_TIME=2024-01-13T14:30:00Z
```

### Build Optimization

For production builds, ensure:

- `NODE_ENV=production` is set
- Source maps are disabled for security (optional)
- Bundle analysis is run to check sizes

```bash
# Analyze bundle size
npm run analyze

# Check bundle without building
npm run build -- --analyze
```

## 📊 Performance Optimization

### CDN Configuration

Configure your CDN to serve static assets with proper headers:

```
# JavaScript and CSS
Cache-Control: public, max-age=31536000, immutable

# HTML
Cache-Control: public, max-age=0, must-revalidate

# Images
Cache-Control: public, max-age=31536000
```

### Compression

Enable gzip/brotli compression on your server:

- `.js` files: ~70% compression
- `.css` files: ~80% compression  
- `.html` files: ~60% compression

### Preloading

The build system automatically adds resource hints for optimal loading:

- `<link rel="preload">` for critical CSS
- `<link rel="modulepreload">` for JavaScript modules
- `<link rel="prefetch">` for non-critical resources

## 🔍 Monitoring

### Performance Monitoring

Add analytics and performance monitoring:

```html
<!-- In production build -->
<script>
  // Web Vitals monitoring
  import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';
  
  getCLS(console.log);
  getFID(console.log);
  getFCP(console.log);
  getLCP(console.log);
  getTTFB(console.log);
</script>
```

### Error Tracking

The built-in error handler can be extended for production error tracking:

```javascript
// In production, send errors to your monitoring service
window.vybeApp.getErrorHandler().on('error:captured', (error) => {
  // Send to Sentry, LogRocket, etc.
  analyticsService.trackError(error);
});
```

## 🚨 Troubleshooting

### Build Failures

1. **Node.js version**: Ensure Node.js >= 16.0.0
2. **Memory issues**: Increase Node.js heap size:
   ```bash
   NODE_OPTIONS="--max-old-space-size=4096" npm run build
   ```
3. **Dependency conflicts**: Clear node_modules and reinstall:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

### Legacy Build Fallback

If modern build fails, the system automatically falls back to legacy builds:

```bash
# Manual legacy build
npm run build:legacy
```

### CORS Issues

For development CORS issues, update vite.config.js:

```javascript
export default defineConfig({
  server: {
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
});
```

## ✅ Deployment Checklist

Before deploying:

- [ ] Run `npm run validate` successfully
- [ ] Test in multiple browsers
- [ ] Check mobile responsiveness
- [ ] Verify all images load correctly
- [ ] Test navigation and interactive features
- [ ] Check console for errors
- [ ] Verify bundle sizes are reasonable
- [ ] Test on slow network connections

## 📈 Post-Deployment

After successful deployment:

1. **Test live site** across different devices
2. **Run Lighthouse audit** for performance metrics
3. **Monitor error logs** for any runtime issues
4. **Set up uptime monitoring** for availability
5. **Configure analytics** for usage tracking

---

Need help? Check the troubleshooting section or open an issue.