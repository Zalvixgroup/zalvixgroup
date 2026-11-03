export interface BookingAlertPayload {
  bookingId: string;
  customerName: string;
  phoneNumber: string;
  selectedSubService: string;
  gorakhpurArea: string;
  fullAddress?: string | null;
  inspectionFee?: number;
}

export async function sendBrevoLeadAlert(booking: BookingAlertPayload) {
  const apiKey = process.env.BREVO_API_KEY;
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL;
  const senderEmail = process.env.SENDER_EMAIL || "notifications@gorakhpurrepairs.com";
  const senderName = process.env.SENDER_NAME || "Gorakhpur Repairs Alert";

  if (!apiKey || !adminEmail) {
    console.warn("Brevo API key or admin notification email not set. Skipping lead notification.");
    return;
  }

  const emailPayload = {
    sender: {
      name: senderName,
      email: senderEmail,
    },
    to: [{ email: adminEmail }],
    subject: `🚨 New Lead #${booking.bookingId}: ${booking.selectedSubService} - ${booking.gorakhpurArea}`,
    htmlContent: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1e293b;">
        <h2 style="color: #1d4ed8; margin-bottom: 8px;">New Doorstep Service Booking</h2>
        <p style="background: #eff6ff; padding: 10px 14px; border-radius: 8px; font-weight: bold; color: #1e40af;">
          Booking ID: #${booking.bookingId}
        </p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 14px;">
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold; width: 140px;">Customer Name:</td>
            <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${booking.customerName}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Mobile Number:</td>
            <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">
              <a href="tel:${booking.phoneNumber}" style="color: #2563eb; text-decoration: none; font-weight: bold;">
                ${booking.phoneNumber}
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Service:</td>
            <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${booking.selectedSubService}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Gorakhpur Area:</td>
            <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${booking.gorakhpurArea}</td>
          </tr>
          ${
            booking.fullAddress
              ? `<tr>
                  <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Full Address:</td>
                  <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${booking.fullAddress}</td>
                </tr>`
              : ""
          }
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Inspection Fee:</td>
            <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">₹99 (Waived if service taken, Pay after service)</td>
          </tr>
        </table>
        <div style="margin-top: 20px; padding: 12px; background: #fef3c7; border-left: 4px solid #d97706; border-radius: 4px;">
          <strong style="color: #92400e;">SLA Reminder:</strong> Please call customer within 10 minutes to confirm doorstep appointment.
        </div>
      </div>
    `,
  };

  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify(emailPayload),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Brevo API notification returned error status:", res.status, err);
    }
  } catch (error) {
    console.error("Failed to send Brevo lead email alert:", error);
  }
}
