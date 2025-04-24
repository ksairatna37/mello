const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Use service role key for inserts
);

// Create reusable transporter using Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// POST /api/notify - store email in Supabase and send confirmation email
app.post('/api/notify', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });
  try {
    const { data, error } = await supabase
      .from('notify_emails')
      .insert([{ email }]);
    if (error) {
      // Log the error for debugging
      console.error('Supabase insert error:', error);
      const errorText = JSON.stringify(error).toLowerCase();
      if (
        (error.code === '23505') ||
        (error.message && error.message.toLowerCase().includes('duplicate')) ||
        (error.details && error.details.toLowerCase().includes('duplicate')) ||
        errorText.includes('duplicate')
      ) {
        return res.status(409).json({ error: 'You are already subscribed.' });
      }
      throw error;
    }
    // Send confirmation email after successful insert
    await transporter.sendMail({
      from: `"Mello Health" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Welcome to Mello! Thanks for subscribing',
      text: 'Thank you for subscribing to Mello! We will notify you when the app launches.', // Plain text version
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"

  <link href="https://fonts.googleapis.com/css2?family=Playwrite+HR+Lijeva:wght@100..400&display=swap" rel="stylesheet">
          <title>Welcome to Mello</title>
          <style>
            body {
    font-family: 'Open Sans', sans-serif;
              line-height: 1.6;
              color: #333333;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(90deg, #01C3CC 0%, #3C7AD9 50%, #7C29E8 100%);
              padding: 30px;
              text-align: center;
              border-radius: 8px 8px 0 0;
            }
            .logo {
              font-size: 32px;
              font-weight: 400; 
              color: white;
              font-family: "Playwrite HR Lijeva", cursive;
              margin: 0;
            }
            .content {
              background-color: #ffffff;
              padding: 30px;
              border-left: 1px solid #e0e0e0;
              border-right: 1px solid #e0e0e0;
            }
            .footer {
              background-color: #f5f5f5;
              padding: 20px;
              text-align: center;
              font-size: 12px;
              color: #888888;
              border-radius: 0 0 8px 8px;
              border: 1px solid #e0e0e0;
            }
            h1 {
              background: linear-gradient(90deg, #01C3CC 0%, #3C7AD9 50%, #7C29E8 100%);
              margin-top: 0;
              color: transparent;
              -webkit-background-clip: text;
              background-clip: text;
              -webkit-text-fill-color: transparent;
              display: inline-block;
            }
            .button {
              display: inline-block;
              background: linear-gradient(90deg, #01C3CC 0%, #3C7AD9 50%, #7C29E8 100%);
              color: #ffffff;
              text-decoration: none;
              padding: 12px 30px;
              border-radius: 4px;
              font-weight: bold;
              margin: 20px 0;
            }
            .social-icons {
              margin-top: 20px;
            }
            .content a{
              color:white !important;
            }
            .social-icons a {
              display: inline-block;
              margin: 0 10px;
              color: #6366F1;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo"><img src="https://imgur.com/B5UeUZc.png" alt="Mello Logo" /></div>
            </div>
            <div class="content">
              <h1>Thanks for subscribing!</h1>
              <p>Hi there,</p>
              <p>We're excited to have you on board! Thank you for subscribing to Mello.</p>
              <p>We'll notify you as soon as our app launches. In the meantime, stay tuned for updates and be among the first to experience our innovative health platform.</p>
              <p>If you have any questions, feel free to reach out to us.</p>
              <a href="#" class="button">Visit Our Website</a>
              <p>Best regards,<br>The Mello Team</p>
            </div>
            <div class="footer">
              <p> 2025 Mello Health. All rights reserved.</p>
              <p>You're receiving this email because you signed up for updates from Mello.</p>
              <div class="social-icons">
                <a href="https://x.com/MellowHealth">X.com</a> •
                <a href="#">Instagram</a> •
              </div>
            </div>
          </div>
        </body>
        </html>
      `
    });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.use(express.static(path.join(__dirname, '../../build')));

// The "catchall" handler: for any request that doesn't match an API route, send back React's index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../build', 'index.html'));
});

app.listen(PORT, () => {
  console.log('Server running on port ${PORT}');
});