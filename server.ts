import express from 'express';
import { createServer as createViteServer } from 'vite';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const upload = multer({ storage: multer.memoryStorage() });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Email Config
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465, 
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    connectionTimeout: 10000, 
    greetingTimeout: 10000,
    debug: true,
    logger: true,
  });

  // API Route
  app.post('/api/admission', upload.any(), async (req, res) => {
    console.log('Received admission submission request');
    
    try {
      const { fullName, email, phone, course, address, parentName, category } = req.body;
      const files = req.files as Express.Multer.File[];
      const marksheetFile = files?.find(f => f.fieldname === 'marksheet');

      // Prepare recipients and deduplicate
      const recipientList = Array.from(new Set(['contact@edufeedus.com', process.env.SMTP_USER].filter(Boolean) as string[]));
      console.log('Sending notification to:', recipientList.join(', '));

      // Send email
      const info = await transporter.sendMail({
        from: `"${fullName || 'Admission Portal'}" <${process.env.SMTP_USER}>`,
        to: recipientList.join(', '),
        replyTo: email || process.env.SMTP_USER,
        subject: `[Admission Application] ${fullName || 'New Student'} - ${course || 'General'}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: auto; padding: 40px; border: 1px solid #f1f5f9; border-radius: 24px; background-color: #ffffff;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #0d9488; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.025em;">EDUFEEDUS</h1>
              <p style="color: #64748b; font-size: 14px; margin-top: 4px;">Admission Department</p>
            </div>
            
            <div style="background-color: #f8fafc; padding: 24px; border-radius: 16px; margin-bottom: 30px;">
              <h2 style="color: #0f172a; margin: 0 0 16px 0; font-size: 18px; font-weight: 700;">Application Details</h2>
              
              <div style="margin-bottom: 24px;">
                <p style="margin: 0; font-size: 12px; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em;">Full Name</p>
                <p style="margin: 4px 0 0 0; font-size: 16px; color: #334155; font-weight: 500;">${fullName || 'Not provided'}</p>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px;">
                <div style="display: inline-block; width: 48%;">
                  <p style="margin: 0; font-size: 12px; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em;">Email</p>
                  <p style="margin: 4px 0 0 0; font-size: 14px; color: #334155;">${email || 'Not provided'}</p>
                </div>
                <div style="display: inline-block; width: 48%;">
                  <p style="margin: 0; font-size: 12px; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em;">Phone</p>
                  <p style="margin: 4px 0 0 0; font-size: 14px; color: #334155;">${phone || 'Not provided'}</p>
                </div>
              </div>

              <div style="margin-bottom: 24px;">
                <p style="margin: 0; font-size: 12px; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em;">Course Interest</p>
                <p style="margin: 4px 0 0 0; font-size: 16px; color: #0d9488; font-weight: 600;">${course || 'Not provided'}</p>
              </div>

              <div style="margin-bottom: 24px;">
                <p style="margin: 0; font-size: 12px; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em;">Parent/Guardian</p>
                <p style="margin: 4px 0 0 0; font-size: 15px; color: #334155;">${parentName || 'Not provided'}</p>
              </div>

              <div style="margin-bottom: 24px;">
                <p style="margin: 0; font-size: 12px; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em;">Category</p>
                <p style="margin: 4px 0 0 0; font-size: 15px; color: #334155;">${category || 'Not provided'}</p>
              </div>

              <div style="margin: 0;">
                <p style="margin: 0; font-size: 12px; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em;">Address</p>
                <p style="margin: 4px 0 0 0; font-size: 14px; color: #334155; line-height: 1.5;">${address || 'Not provided'}</p>
              </div>
            </div>
            
            ${marksheetFile ? `
              <div style="background-color: #f0fdfa; border: 1px solid #ccfbf1; padding: 16px; border-radius: 12px; display: flex; align-items: center; gap: 12px; margin-bottom: 30px;">
                <span style="font-size: 20px;">📎</span>
                <div>
                  <p style="margin: 0; font-size: 14px; font-weight: 600; color: #115e59;">Marksheet Attached</p>
                  <p style="margin: 2px 0 0 0; font-size: 12px; color: #14b8a6;">${marksheetFile.originalname}</p>
                </div>
              </div>
            ` : `
              <div style="background-color: #fef2f2; border: 1px solid #fee2e2; padding: 16px; border-radius: 12px; display: flex; align-items: center; gap: 12px; margin-bottom: 30px;">
                <span style="font-size: 20px;">⚠</span>
                <p style="margin: 0; font-size: 14px; font-weight: 600; color: #991b1b;">No local marksheet attached.</p>
              </div>
            `}
            
            <div style="text-align: center;">
              <p style="margin: 0; font-size: 13px; color: #94a3b8;">
                Submission Date: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} (IST)
              </p>
              <div style="height: 1px; background-color: #f1f5f9; margin: 20px 0;"></div>
              <p style="margin: 0; font-size: 11px; color: #cbd5e1; line-height: 1.4;">
                This application was submitted via the Edufeedus website portal.<br/>
                Confidential Document • Internal Use Only
              </p>
            </div>
          </div>
        `,
        attachments: marksheetFile ? [{
          filename: marksheetFile.originalname,
          content: marksheetFile.buffer,
        }] : [],
      });

      console.log('Email sent successfully. MessageID:', info.messageId);
      res.status(200).json({ 
        message: 'Application submitted successfully',
        submissionId: info.messageId
      });
    } catch (error) {
      console.error('SMTP/Server Error:', error);
      res.status(500).json({ 
        message: 'Internal server error during submission', 
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
