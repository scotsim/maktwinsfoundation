# Makinde Twins Foundation Website

A modern, responsive website for the Makinde Twins Foundation educational support program with Node.js serverless backend for form submissions.

## Features

- 🎨 Modern, responsive design with Tailwind CSS
- 📝 Multi-step application form with file uploads
- 📧 Email notifications sent to shamuelmoses@gmail.com
- ✅ Success page after submission
- 🚀 Serverless architecture (Vercel-ready)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Email Settings

You need to set up a Gmail account for sending emails:

1. Go to your Google Account settings
2. Enable 2-Factor Authentication
3. Generate an App Password: https://myaccount.google.com/apppasswords
4. Copy the 16-character password

### 3. Set Environment Variables

For local development, create a `.env` file:

```bash
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-character-app-password
```

### 4. Test Locally (Optional)

Install Vercel CLI and run locally:

```bash
npm install -g vercel
vercel dev
```

Visit `http://localhost:3000` to test the application.

## Deployment to Vercel

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure the project:
   - Framework Preset: **Other**
   - Root Directory: `./`
   - Build Command: (leave empty)
   - Output Directory: (leave empty)

### Step 3: Add Environment Variables in Vercel

In your Vercel project settings:

1. Go to **Settings** → **Environment Variables**
2. Add the following variables:
   - `EMAIL_USER`: your-email@gmail.com
   - `EMAIL_PASS`: your-16-character-app-password
3. Click **Save**

### Step 4: Redeploy

After adding environment variables, trigger a new deployment:
- Go to **Deployments** tab
- Click the three dots on the latest deployment
- Select **Redeploy**

## Project Structure

```
mkfoundation/
├── api/
│   └── submit-application.js    # Serverless function for form submission
├── index.html                    # Homepage
├── application.html              # Application form
├── success.html                  # Success page after submission
├── package.json                  # Node.js dependencies
├── vercel.json                   # Vercel configuration
├── .env.example                  # Environment variables template
└── .gitignore                    # Git ignore file
```

## Email Configuration

The application sends emails to: **shamuelmoses@gmail.com**

To change the recipient email, edit `/api/submit-application.js`:

```javascript
to: 'shamuelmoses@gmail.com',  // Change this line
```

## File Uploads

Currently, the form collects file information but doesn't upload files to the server. To enable file uploads, you'll need to:

1. Set up cloud storage (AWS S3, Cloudinary, etc.)
2. Modify the serverless function to handle file uploads
3. Update the form submission to send files

## Support

For questions or issues:
- Email: contact@makindetwinsfoundation.org
- Phone: +2348037272478 | +2348136721498

## License

© 2025 Makinde Twins Foundation. All rights reserved.
