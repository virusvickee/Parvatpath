export function bookingConfirmationHTML(data: {
  bookingId: string
  trekName: string
  startDate: string
  endDate: string
  participants: number
  amountPaid: number
  balanceDue: number
  paymentType: string
}) {
  return `
    <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; background: #0D1117; color: #F0F6FC; padding: 32px; border-radius: 12px;">
      <h2 style="color: #F97316;">🏔️ Booking Confirmed!</h2>
      <p>Your trek booking is confirmed. Here are your details:</p>
      
      <div style="background: #161B22; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Booking ID:</strong> ${data.bookingId}</p>
        <p><strong>Trek:</strong> ${data.trekName}</p>
        <p><strong>Dates:</strong> ${data.startDate} &rarr; ${data.endDate}</p>
        <p><strong>Participants:</strong> ${data.participants}</p>
        <hr style="border-color: #30363D;" />
        <p><strong>Amount Paid:</strong> ₹${data.amountPaid.toLocaleString('en-IN')}</p>
        ${data.paymentType === 'advance' ? `<p style="color: #F59E0B;"><strong>Balance Due:</strong> ₹${data.balanceDue.toLocaleString('en-IN')} (to be paid 7 days before trek)</p>` : ''}
      </div>
      
      <p>Our team will contact you 3 days before the trek with pickup details.</p>
      <p>For queries: <a href="https://wa.me/919634923602" style="color: #F97316;">WhatsApp Us</a></p>
      
      <p style="color: #8B949E; font-size: 12px;">Parvatpath.com | Dehradun, Uttarakhand</p>
    </div>
  `
}
