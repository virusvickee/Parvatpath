export async function sendOTPviaSMS(phone: string, otp: string) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const twilio = require('twilio')
  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  )
  await client.messages.create({
    body: `Your Parvatpath OTP is: ${otp}. Valid for 10 minutes. Do not share with anyone.`,
    from: process.env.TWILIO_PHONE,
    to: `+91${phone}`,
  })
}

export async function sendOTPviaEmail(email: string, otp: string) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { Resend } = require('resend')
  const resend = new Resend(process.env.RESEND_API_KEY)
  await resend.emails.send({
    from: 'Parvatpath <noreply@parvatpath.com>',
    to: email,
    subject: `Your Parvatpath OTP: ${otp}`,
    html: `
      <div style="font-family: Inter, sans-serif; max-width: 480px; margin: 0 auto;">
        <h2 style="color: #F97316;">Parvatpath 🏔️</h2>
        <p>Your OTP for login is:</p>
        <h1 style="letter-spacing: 8px; color: #0D1117; background: #F97316; padding: 16px; text-align: center; border-radius: 8px;">
          ${otp}
        </h1>
        <p style="color: #666;">Valid for 10 minutes. Do not share with anyone.</p>
      </div>
    `,
  })
}
