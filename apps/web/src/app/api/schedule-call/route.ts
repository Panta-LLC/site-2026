import { NextRequest, NextResponse } from "next/server";
// @ts-expect-error - nodemailer types don't have default export but runtime does
import nodemailer from "nodemailer";

interface ScheduleRequest {
  schedulingMode: "nextAvailable" | "anyTime" | "specificTimes";
  timeRanges?: Array<{
    date: string;
    startTime: string;
    endTime: string;
  }>;
  anyTimeDates?: string[];
  message?: string;
}

function formatScheduleData(data: ScheduleRequest): string {
  let scheduleText = "";

  switch (data.schedulingMode) {
    case "nextAvailable":
      scheduleText = "Next available slot - we'll find a time that works for both of us.";
      break;
    case "anyTime":
      if (data.anyTimeDates && data.anyTimeDates.length > 0) {
        scheduleText = "Available any time on:\n" + data.anyTimeDates.filter(Boolean).join("\n");
      }
      break;
    case "specificTimes":
      if (data.timeRanges && data.timeRanges.length > 0) {
        scheduleText =
          "Specific time ranges:\n" +
          data.timeRanges
            .filter((r) => r.date)
            .map((r) => {
              if (r.startTime && r.endTime) {
                return `${r.date} from ${r.startTime} to ${r.endTime}`;
              }
              return r.date;
            })
            .join("\n");
      }
      break;
  }

  return scheduleText;
}

function createTransporter() {
  // Check if SMTP is configured
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      logger: true,
      debug: true,
    });
  }

  // Gmail OAuth2 support
  if (
    process.env.GMAIL_CLIENT_ID &&
    process.env.GMAIL_CLIENT_SECRET &&
    process.env.GMAIL_REFRESH_TOKEN
  ) {
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
    const body: ScheduleRequest = await request.json();

    // Validate required fields
    if (!body.schedulingMode) {
      return NextResponse.json({ error: "Scheduling mode is required" }, { status: 400 });
    }

    // Format the email content
    const scheduleText = formatScheduleData(body);
    const recipientEmail =
      process.env.SCHEDULE_CALL_EMAIL || process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@panta.com";
    const fromEmail = process.env.SMTP_FROM_EMAIL || process.env.GMAIL_USER || "noreply@panta.com";

    const emailSubject = "New Call Scheduling Request";
    const emailBody = `
New call scheduling request received:

Scheduling Preference: ${body.schedulingMode}

${scheduleText}

${body.message ? `Message:\n${body.message}` : "No additional message provided."}

---
This request was submitted through the website contact form.
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
          { success: true, message: "Schedule request submitted successfully" },
          { status: 200 }
        );
      } catch (emailError) {
        console.error("Nodemailer error:", emailError);
        // Fall through to logging fallback
      }
    }

    // Fallback: Log to console (for development)
    console.log("Schedule Call Request (email not configured):", {
      to: recipientEmail,
      subject: emailSubject,
      body: emailBody,
    });

    // Return success even if email isn't configured (for development)
    return NextResponse.json(
      {
        success: true,
        message: "Schedule request received. We'll contact you soon.",
        // Include mailto link as fallback
        mailto: `mailto:${recipientEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing schedule request:", error);
    return NextResponse.json({ error: "Failed to process schedule request" }, { status: 500 });
  }
}
