# Mello Backend API

This backend handles email submissions for the "Coming Soon" page.

## Features
- Receives emails from the frontend via `/api/notify` endpoint
- Stores emails in a Supabase table called `notify_emails`

## Setup
1. Create a `.env` file in this directory with:
   - `SUPABASE_URL=your_supabase_url_here`
   - `SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here`
   - `PORT=5000` (or your preferred port)
2. Run `npm install` to install dependencies.
3. Start the server with `npm start`.

## Supabase Table
Create a table in Supabase named `notify_emails` with at least one column:
- `email` (type: text, unique)

## Next Steps
- Connect the React frontend to this API endpoint.
- (Optional) Integrate an email service for notifications when the app launches.
