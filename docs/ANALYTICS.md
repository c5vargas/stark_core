# Google Analytics Integration Guide

This guide will help you set up Google Analytics integration in Stark Core to track visitors and view detailed metrics about your application.

## Overview

Stark Core includes built-in Google Analytics integration that provides:

- **Real-time Metrics** - Page views, unique visitors, session duration, and bounce rate
- **Traffic Charts** - Visual representation of traffic over time (7, 30, or 90 days)
- **Top Pages** - Most visited pages with detailed statistics
- **Automatic Tracking** - Page views are automatically tracked when users navigate

## Prerequisites

Before you begin, ensure you have:

1. A Google account
2. A Google Analytics 4 (GA4) property set up
3. Access to Google Cloud Console
4. Admin permissions in your Stark Core application

## Step 1: Create a Google Analytics 4 Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new GA4 property or use an existing one
3. Note your **Property ID** (e.g., `123456789`)

## Step 2: Set Up Google Cloud Console

### 2.1 Create a Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google Analytics Data API**:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google Analytics Data API"
   - Click "Enable"

### 2.2 Create a Service Account

1. Navigate to "IAM & Admin" > "Service Accounts"
2. Click "Create Service Account"
3. Fill in the details:
   - **Service account name**: `stark-core-analytics`
   - **Service account ID**: `stark-core-analytics` (auto-generated)
   - **Description**: "Service account for Stark Core Analytics integration"
4. Click "Create and Continue"
5. Skip role assignment (click "Continue")
6. Click "Done"

### 2.3 Create and Download Service Account Key

1. Find your newly created service account in the list
2. Click on it to open details
3. Go to the "Keys" tab
4. Click "Add Key" > "Create new key"
5. Select **JSON** format
6. Click "Create"
7. The JSON file will be downloaded automatically - **save this file securely**

### 2.4 Grant Analytics Access

1. Go to [Google Analytics](https://analytics.google.com/)
2. Navigate to "Admin" > "Property Access Management"
3. Click the "+" button to add a user
4. Enter the **Service Account Email** (found in the JSON file as `client_email`)
5. Select role: **Viewer** (minimum required)
6. Click "Add"

## Step 3: Configure Stark Core

### 3.1 Upload Service Account Key

1. Log in to your Stark Core dashboard
2. Navigate to **Settings** > **Analytics**
3. In the "Google service account key file" field:
   - Click "Select File"
   - Choose the JSON file you downloaded from Google Cloud Console
   - The file will be uploaded and stored securely

### 3.2 Enter Property ID

1. In the "Google analytics property ID" field:
   - Enter your GA4 Property ID (e.g., `123456789`)
   - This is the numeric ID, not the measurement ID

### 3.3 Enter Measurement ID (Optional)

1. In the "Google tag manager measurement ID" field:
   - Enter your GA4 Measurement ID (e.g., `G-XXXXXXXXXX`)
   - This enables frontend tracking via Google Tag Manager
   - Only the ID is needed, not the full JavaScript snippet

### 3.4 Save Configuration

1. Click "Update settings"
2. Wait for the success message
3. The system will validate your configuration automatically

## Step 4: Verify Integration

### 4.1 Check Dashboard

1. Navigate to **Dashboard** in Stark Core
2. If configured correctly, you should see:
   - Analytics widgets with real data
   - Traffic overview chart
   - Top pages list

### 4.2 Test Data Collection

1. Visit your application from different browsers/devices
2. Navigate through different pages
3. Wait a few minutes for data to appear in Google Analytics
4. Check the dashboard - data should refresh automatically every 5 minutes

## API Endpoints

The following API endpoints are available for analytics data:

### Get Overview Metrics

```
GET /api/analytics/overview
```

Returns:
- Page views
- Unique visitors
- Average session duration
- Bounce rate

### Get Traffic Data

```
GET /api/analytics/traffic?range=7d|30d|90d
```

Returns traffic data points for the specified range.

### Get Top Pages

```
GET /api/analytics/top-pages?limit=5
```

Returns the most visited pages with statistics.

## Troubleshooting

### Issue: "Google Analytics is not configured" Message

**Solution:**
- Ensure all three fields are filled:
  1. Service account key file (JSON)
  2. Analytics property ID
  3. Measurement ID (optional but recommended)

### Issue: "Failed to initialize Google Analytics client"

**Possible Causes:**
- Invalid JSON file format
- Missing required fields in JSON
- Service account doesn't have access to Analytics property

**Solution:**
1. Verify the JSON file is valid
2. Check that the service account email has Viewer access in Google Analytics
3. Ensure the Analytics Data API is enabled in Google Cloud Console

### Issue: No Data Showing

**Possible Causes:**
- Property ID is incorrect
- Service account lacks permissions
- No traffic yet in Google Analytics

**Solution:**
1. Double-check the Property ID matches your GA4 property
2. Verify service account permissions in Google Analytics
3. Wait 24-48 hours for initial data collection
4. Generate some test traffic by visiting your site

### Issue: "Invalid JSON file format"

**Solution:**
- Ensure you're uploading the complete JSON file from Google Cloud Console
- Don't modify the file contents
- File must have `.json` extension

### Issue: CORS Errors

**Solution:**
- CORS is handled automatically by the backend
- If issues persist, check your server configuration

## Security Best Practices

1. **Protect Service Account Key**
   - Never commit the JSON file to version control
   - Store it securely on the server
   - Rotate keys periodically

2. **Minimal Permissions**
   - Only grant "Viewer" role to the service account
   - Don't grant admin or edit permissions

3. **Regular Audits**
   - Review service account access periodically
   - Remove unused service accounts

## Data Refresh

Analytics data is automatically refreshed every 5 minutes. You can also manually refresh by:

1. Reloading the dashboard page
2. The data will be fetched automatically

## Frontend Tracking

When the Measurement ID is configured, Stark Core automatically tracks:

- Page views on route changes
- User navigation patterns
- Custom events (can be extended)

This data appears in your Google Analytics dashboard in real-time.

## Support

For additional help:

1. Check Google Analytics [documentation](https://support.google.com/analytics)
2. Review Google Cloud Console [guides](https://cloud.google.com/docs)
3. Consult your development team

---

**Last Updated**: November 2025  
**Version**: 1.0.0

