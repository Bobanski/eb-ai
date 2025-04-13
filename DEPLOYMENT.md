# Smoothie Bot Deployment Guide

This guide provides instructions for deploying the Smoothie Bot application to Vercel.

## Prerequisites

- A Vercel account
- An OpenAI API key

## Backend Deployment

1. **Set up environment variables in Vercel**:
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `ALLOWED_ORIGINS`: Comma-separated list of allowed origins (including your Vercel frontend URL)

2. **Deploy the backend to Vercel**:
   ```bash
   # Install Vercel CLI if you haven't already
   npm install -g vercel

   # Deploy
   vercel
   ```

3. **Note your backend URL** (e.g., `https://smoothie-bot-api.vercel.app`)

## Frontend Deployment

1. **Move images to the frontend**:
   ```bash
   # Create a public/images directory in the frontend
   mkdir -p smoothie-ui/public/images

   # Copy all images to the frontend public directory
   cp data/MenuImages/* smoothie-ui/public/images/
   ```

2. **Set up environment variables in Vercel**:
   - `VITE_API_BASE`: Your backend URL (e.g., `https://smoothie-bot-api.vercel.app`)

3. **Deploy the frontend to Vercel**:
   ```bash
   # Navigate to the frontend directory
   cd smoothie-ui

   # Deploy
   vercel
   ```

## Post-Deployment Verification

1. Visit your deployed frontend URL
2. Test the chat functionality to ensure it's connecting to the backend
3. Verify that images are loading correctly

## Troubleshooting

- If images aren't loading, check the image paths in the frontend code
- If the API isn't responding, check the CORS configuration and environment variables
- Check Vercel logs for any deployment errors