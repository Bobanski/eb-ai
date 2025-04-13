# Smoothie UI Vercel Deployment Guide

This guide provides detailed instructions for deploying the Smoothie UI frontend to Vercel.

## Prerequisites

- A Vercel account
- Access to the repository

## Deployment Steps

### 1. Set Up the Project in Vercel Dashboard

1. Log in to your Vercel account
2. Click "Add New" → "Project"
3. Import your Git repository
4. **IMPORTANT**: Configure the project settings:
   - **Framework Preset**: Select "Vite"
   - **Root Directory**: Set to `smoothie-ui` (this is critical!)
   - **Build Command**: `npm run build` (should be auto-detected)
   - **Output Directory**: `dist` (should be auto-detected)

### 2. Configure Environment Variables

Add the following environment variables in the Vercel project settings:

- `VITE_API_BASE`: Set to your backend API URL (e.g., `https://eb-ai-backend.vercel.app`)

Note: The backend has been configured to allow requests from the following frontend URLs:
- https://smoothie-bot-frontend.vercel.app
- https://www.smoothie-bot-frontend.vercel.app
- https://earthbar-ai.vercel.app
- https://www.earthbar-ai.vercel.app

### 3. Deploy

Click "Deploy" and wait for the deployment to complete.

### 4. Verify Deployment

1. Once deployed, Vercel will provide a URL for your frontend (e.g., `https://smoothie-ui.vercel.app`)
2. Visit the URL to verify that the frontend is working correctly
3. You can also check `/test.html` (e.g., `https://smoothie-ui.vercel.app/test.html`) to verify that static files are being served correctly

## Troubleshooting

If you see the backend API documentation instead of the frontend UI:

1. **Check Root Directory Setting**: Make sure the Root Directory is set to `smoothie-ui` in your Vercel project settings
2. **Verify vercel.json**: Ensure the vercel.json file in the smoothie-ui directory is being used
3. **Check Build Logs**: Review the build logs in the Vercel dashboard for any errors

## Additional Notes

- The `copy-images.js` script has been updated to be more robust in the Vercel environment
- The `vercel.json` file in the smoothie-ui directory configures the deployment to serve the frontend correctly