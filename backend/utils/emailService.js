const nodemailer = require('nodemailer');

// Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  debug: true,
  logger: true
});

// Verify transporter configuration
transporter.verify(function(error, success) {
  if (error) {
    console.error('SMTP Configuration Error:', error);
  } else {
    console.log('SMTP Server is ready to send emails');
  }
});

const sendLogoRequestEmail = async (formData, referenceImages) => {
  try {
    // Check if email credentials are configured
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS || process.env.SMTP_USER === 'your-email@gmail.com') {
      console.warn('Email credentials not configured. Skipping email send.');
      return { success: false, error: 'Email service not configured' };
    }

    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      businessName,
      logoStyle,
      colorPreferences,
      symbolsElements,
      message
    } = formData;

    const emailContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #2563eb, #1d4ed8);
            color: white;
            padding: 30px;
            border-radius: 10px;
            margin-bottom: 30px;
            text-align: center;
          }
          .section {
            background: #f8fafc;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
            border: 1px solid #e2e8f0;
          }
          .section h3 {
            color: #1d4ed8;
            margin-top: 0;
            border-bottom: 2px solid #e2e8f0;
            padding-bottom: 10px;
          }
          .field {
            margin-bottom: 10px;
          }
          .field strong {
            color: #4b5563;
            min-width: 150px;
            display: inline-block;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            padding: 20px;
            background: #f8fafc;
            border-radius: 8px;
            border: 1px solid #e2e8f0;
          }
          .reference-images {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-top: 15px;
          }
          .reference-image {
            max-width: 100%;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h2>Logo Design Request Details</h2>
        </div>
        
        <div class="section">
          <h3>Personal Information</h3>
          <div class="field">
            <strong>Name:</strong> ${firstName} ${lastName}
          </div>
          <div class="field">
            <strong>Email:</strong> ${email}
          </div>
          <div class="field">
            <strong>Phone Number:</strong> ${phoneNumber}
          </div>
        </div>
        
        <div class="section">
          <h3>Business Information</h3>
          <div class="field">
            <strong>Business Name:</strong> ${businessName}
          </div>
        </div>
        
        <div class="section">
          <h3>Design Preferences</h3>
          <div class="field">
            <strong>Logo Style:</strong> ${logoStyle || 'Not specified'}
          </div>
          <div class="field">
            <strong>Color Preferences:</strong> ${colorPreferences || 'Not specified'}
          </div>
          <div class="field">
            <strong>Symbols/Elements:</strong> ${symbolsElements || 'Not specified'}
          </div>
        </div>
        
        ${message ? `
        <div class="section">
          <h3>Additional Message</h3>
          <div class="field">
            ${message}
          </div>
        </div>
        ` : ''}
        
        ${referenceImages.length > 0 ? `
        <div class="section">
          <h3>Reference Images</h3>
          <div class="reference-images">
            ${referenceImages.map((file, index) => `
              <img src="cid:reference-image-${index}" class="reference-image" alt="Reference Image ${index + 1}">
            `).join('')}
          </div>
        </div>
        ` : ''}
        
        <div class="footer">
          <p>Thank you for choosing Elite Filing for your logo design needs.</p>
          <p>Our team will review your request and contact you shortly.</p>
        </div>
      </body>
      </html>
    `;

    // Prepare attachments for reference images
    const attachments = referenceImages.map((file, index) => ({
      filename: file.originalname,
      content: file.buffer,
      cid: `reference-image-${index}`, // Same cid value as used in the template
      contentType: file.mimetype,
      encoding: 'base64'
    }));

    // Send email with attachments
    await transporter.sendMail({
      from: process.env.SMTP_FROM || '"Elite Filing" <noreply@elitefiling.com>',
      to: email,
      subject: 'Logo Design Request Confirmation - Elite Filing',
      html: emailContent,
      attachments
    });

    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendLogoRequestEmail
};