'use server'
import { Resend } from 'resend';

// Initialize Resend with your API Key from .env.local
const resend = new Resend(process.env.RESEND_API_KEY);

export async function createBooking(formData: { 
  email: string; 
  phone: string; 
  date: string; 
  time: string 
}) {
  try {
    // 1. Basic Validation
    if (!formData.email) {
      return { success: false, message: "Email is required for confirmation." };
    }

    // 2. Send the Confirmation Email
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>', 
      to: [formData.email], // Remember: Use your registered email for testing!
      subject: 'Appointment Confirmed! 🗓️',
      html: `
        <div style="font-family: sans-serif; line-height: 1.5;">
          <h1>Booking Confirmed</h1>
          <p>Hi there! Your appointment is successfully scheduled.</p>
          <ul>
            <li><strong>Date:</strong> ${formData.date}</li>
            <li><strong>Time:</strong> ${formData.time}</li>
          </ul>
          <p>We look forward to seeing you!</p>
          <hr />
          <p style="font-size: 12px; color: #666;">Sent via Akshan's Booking App</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend API Error:", error.message);
      return { success: false, message: error.message };
    }

    console.log("Email sent successfully. ID:", data?.id);
    return { success: true, message: "Booking confirmed! Check your inbox." };

  } catch (error: any) {
    console.error("Server Error:", error);
    return { success: false, message: "An unexpected server error occurred." };
  }
}