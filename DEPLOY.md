# Manual Netlify Deployment

## Build for Production

1. **Install dependencies** (if not already done):
```bash
npm install
```

2. **Build the site**:
```bash
npm run build
```

3. **Export static files**:
```bash
npm run export
```

## Deploy to Netlify

### Option A: Drag & Drop
1. Go to your Netlify dashboard
2. Find your existing site
3. Go to "Deploys" tab
4. Drag the `dist` folder to the deploy area
5. Your site will update automatically

### Option B: Netlify CLI
1. **Install Netlify CLI**:
```bash
npm install -g netlify-cli
```

2. **Login to Netlify**:
```bash
netlify login
```

3. **Deploy to existing site**:
```bash
netlify deploy --prod --dir=dist
```

### Option C: Manual Upload
1. Go to your Netlify site dashboard
2. Go to "Deploys" → "Manual deploy"
3. Upload the `dist` folder as a zip file
4. Netlify will extract and deploy

## After Deployment
- Your site will be available at your existing Netlify URL
- All features (GitHub pins, timeline, Bored API) will work
- The site is now static and fast-loading

## Troubleshooting
- If build fails, check Node version (use 18)
- If API calls fail, ensure environment variables are set
- Check Netlify function logs for server-side issues
