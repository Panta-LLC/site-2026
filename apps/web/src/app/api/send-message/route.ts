import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface MessageRequest {
  message: string;
}

function createTransporter() {
  // Check if SMTP is configured
  if (
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS
  ) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  // Gmail OAuth2 support
  if (process.env.GMAIL_CLIENT_ID && process.env.GMAIL_CLIENT_SECRET && process.env.GMAIL_REFRESH_TOKEN) {
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.GMAIL_USER,
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
      },
    });
  }

  // Gmail App Password support
  if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });
  }

  return null;
}

export async function POST(request: NextRequest) {
  try {
    const body: MessageRequest = await request.json();

    // Validate required fields
    if (!body.message || !body.message.trim()) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const recipientEmail = process.env.SCHEDULE_CALL_EMAIL || process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@panta.com";
    const fromEmail = process.env.SMTP_FROM_EMAIL || process.env.GMAIL_USER || "noreply@panta.com";
    
    const emailSubject = "New Message from Website";
    const emailBody = `
New message received from the website contact form:

${body.message.trim()}

---
This message was submitted through the website contact form.
    `.trim();

    // Try to send email using Nodemailer if configured
    const transporter = createTransporter();
    
    if (transporter) {
      try {
        const info = await transporter.sendMail({
          from: fromEmail,
          to: recipientEmail,
          subject: emailSubject,
          text: emailBody,
        });

        console.log("Email sent successfully:", info.messageId);

        return NextResponse.json(
          { success: true, message: "Message sent successfully" },
          { status: 200 }
        );
      } catch (emailError) {
        console.error("Nodemailer error:", emailError);
        // Fall through to logging fallback
      }
    }

    // Fallback: Log to console (for development)
    console.log("Message Request (email not configured):", {
      to: recipientEmail,
      subject: emailSubject,
      body: emailBody,
    });

    // Return success even if email isn't configured (for development)
    return NextResponse.json(
      {
        success: true,
        message: "Message received. We'll contact you soon.",
        mailto: `mailto:${recipientEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing message request:", error);
    return NextResponse.json(
      { error: "Failed to process message request" },
      { status: 500 }
    );
  }
}

