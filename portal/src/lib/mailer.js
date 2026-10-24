import nodemailer from 'nodemailer';

let transporter = null;

function getTransporter() {
  if (!transporter) {
    const rawUser = process.env.SMTP_USER || 'kshitizd171@gmail.com';
    const rawPass = process.env.SMTP_PASS;

    if (!rawPass) {
      console.warn('[Mailer] SMTP_PASS not configured in environment variables.');
      return null;
    }

    const cleanUser = String(rawUser).replace(/['"]+/g, '').trim();
    const cleanPass = String(rawPass).replace(/['"\s]+/g, '').trim();

    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: cleanUser,
        pass: cleanPass,
      },
      tls: { rejectUnauthorized: false },
      connectionTimeout: 15000,
      socketTimeout: 15000,
    });
  }
  return transporter;
}

/**
 * Sends an email notification to the studio lead when a candidate project is submitted.
 * @param {Object} submission
 */
export async function sendCandidateNotificationEmail(submission) {
  try {
    const transport = getTransporter();
    if (!transport) {
      console.warn('[Mailer] SMTP transporter unavailable, skipping email.');
      return { success: false, reason: 'SMTP not configured' };
    }

    const recipient = process.env.ADMIN_EMAIL || process.env.SMTP_USER || 'kshitizd171@gmail.com';
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pinaka-v1.vercel.app';
    
    // Encode full submission payload into review URL so review is 100% reliable across serverless instances
    const encodedSub = Buffer.from(JSON.stringify(submission)).toString('base64');
    const reviewUrl = `${siteUrl}/admin?sub=${encodeURIComponent(encodedSub)}`;

    const stackList = Array.isArray(submission.techStack)
      ? submission.techStack.join(', ')
      : submission.techStack || 'Not specified';

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 24px; }
            .container { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 4px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
            .header { background: #0f1722; color: #ffffff; padding: 24px; border-bottom: 3px solid #d85a20; }
            .header h1 { margin: 0; font-size: 18px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; }
            .header p { margin: 6px 0 0; font-size: 12px; color: #94a3b8; font-family: monospace; }
            .content { padding: 24px; }
            .badge { display: inline-block; padding: 3px 8px; font-size: 11px; font-weight: 600; text-transform: uppercase; background: #edf3f8; color: #0f1722; border: 1px solid #cbd5e1; border-radius: 2px; margin-bottom: 16px; }
            .field-group { margin-bottom: 16px; }
            .field-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; font-weight: 600; margin-bottom: 4px; }
            .field-value { font-size: 14px; color: #0f1722; line-height: 1.5; }
            .code-block { background: #f1f5f9; padding: 12px; border-radius: 4px; font-family: monospace; font-size: 12px; color: #334155; white-space: pre-wrap; word-break: break-word; }
            .btn { display: inline-block; background: #d85a20; color: #ffffff !important; padding: 12px 24px; text-decoration: none; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; border-radius: 2px; margin-top: 16px; }
            .footer { background: #f8fafc; padding: 16px 24px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #64748b; font-family: monospace; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Pinaka Foundry &middot; New Candidate Proposal</h1>
              <p>Reference ID: ${submission.id}</p>
            </div>
            <div class="content">
              <span class="badge">${submission.category} &middot; ${submission.track}</span>
              
              <div class="field-group">
                <div class="field-label">Project Name</div>
                <div class="field-value" style="font-size: 18px; font-weight: 700;">${submission.name}</div>
              </div>

              <div class="field-group">
                <div class="field-label">Lead Builder & Contact</div>
                <div class="field-value"><strong>${submission.leadBuilder}</strong> (${submission.contact})</div>
              </div>

              <div class="field-group">
                <div class="field-label">Tagline</div>
                <div class="field-value">${submission.tagline}</div>
              </div>

              <div class="field-group">
                <div class="field-label">Verified Tech Stack</div>
                <div class="field-value">${stackList}</div>
              </div>

              <div class="field-group">
                <div class="field-label">Repository & Demo Links</div>
                <div class="field-value">
                  ${submission.repoUrl ? `<a href="${submission.repoUrl}" target="_blank" style="color: #d85a20; font-weight: 600;">GitHub Repository</a>` : 'No repo link provided'}
                  ${submission.demoUrl ? ` &bull; <a href="${submission.demoUrl}" target="_blank" style="color: #0f766e; font-weight: 600;">Live Prototype Demo</a>` : ''}
                </div>
              </div>

              <div class="field-group">
                <div class="field-label">Problem Brief & Architectural Thesis</div>
                <div class="code-block">${submission.description}</div>
              </div>

              <a href="${reviewUrl}" class="btn" target="_blank">
                Review & Ingest on Pinaka Control Room &rarr;
              </a>
            </div>
            <div class="footer">
              Pinaka Studios &middot; Sovereign Code &middot; Zero Compromise
            </div>
          </div>
        </body>
      </html>
    `;

    const info = await transport.sendMail({
      from: `"Pinaka Foundry" <${process.env.SMTP_USER || 'kshitizd171@gmail.com'}>`,
      to: recipient,
      subject: `[Pinaka Foundry] New Candidate Proposal: ${submission.name} (${submission.category})`,
      html: htmlContent,
    });

    console.log('[Mailer] Candidate notification email dispatched:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.error('[Mailer] Failed to send email notification:', err.message);
    return { success: false, error: err.message };
  }
}
