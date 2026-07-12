import { Resend } from 'resend'

// Provide a dummy API key during build time if it's missing (e.g. Next.js static page collection)
const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_for_build')

interface BookingDetails {
  service: string
  date: string
  duration: number
  totalPrice: number
  customerName?: string
  email?: string
  phone?: string
}

async function sendEmail(to: string, subject: string, html: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Sunday Vibes <noreply@sundayvibes.com>',
      to,
      subject,
      html,
    })
    if (error) {
      console.error('Email error:', error)
      return { success: false, error }
    }
    return { success: true, data }
  } catch (error) {
    console.error('Email error:', error)
    return { success: false, error }
  }
}

export async function sendBookingConfirmation(email: string, d: BookingDetails) {
  return sendEmail(email, 'Booking Confirmation - Sunday Vibes', `
    <h1>Booking Confirmed!</h1>
    <p>Thank you for booking with Sunday Vibes.</p>
    <h2>Booking Details:</h2>
    <ul>
      <li><strong>Service:</strong> ${d.service}</li>
      <li><strong>Date:</strong> ${d.date}</li>
      <li><strong>Duration:</strong> ${d.duration} days</li>
      <li><strong>Total Price:</strong> Rp ${d.totalPrice.toLocaleString()}</li>
    </ul>
    <p>We'll contact you soon with more details.</p>
  `)
}

export async function sendAdminNotification(d: BookingDetails) {
  return sendEmail('admin@sundayvibes.com', 'New Booking Received', `
    <h1>New Booking Received</h1>
    <h2>Booking Details:</h2>
    <ul>
      <li><strong>Customer:</strong> ${d.customerName}</li>
      <li><strong>Email:</strong> ${d.email}</li>
      <li><strong>Phone:</strong> ${d.phone}</li>
      <li><strong>Service:</strong> ${d.service}</li>
      <li><strong>Date:</strong> ${d.date}</li>
      <li><strong>Duration:</strong> ${d.duration} days</li>
      <li><strong>Total Price:</strong> Rp ${d.totalPrice.toLocaleString()}</li>
    </ul>
    <p>Please review and confirm this booking.</p>
  `)
}
