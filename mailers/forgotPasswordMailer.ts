/* TODO - You need to add a mailer integration in `integrations/` and import here.
 *
 * The integration file can be very simple. Instantiate the email client
 * and then export it. That way you can import here and anywhere else
 * and use it straight away.
 */
import previewEmail from "preview-email"

type ResetPasswordMailer = {
  to: string
  token: string
}

export function forgotPasswordMailer({ to, token }: ResetPasswordMailer) {
  // In production, set APP_ORIGIN to your production server origin
  const origin = process.env.APP_ORIGIN || process.env.BLITZ_DEV_SERVER_ORIGIN
  const resetUrl = `${origin}/reset-password?token=${token}`

  const msg = {
    from: "TODO@example.com",
    to,
    subject: "Your Password Reset Instructions",
    html: `
      <h1>Reset Your Password</h1>
      <h3>NOTE: You must set up a production email integration in mailers/forgotPasswordMailer.ts</h3>

      <a href="${resetUrl}">
        Click here to set a new password
      </a>
    `,
  }

  return {
    async send() {
      if (process.env.NODE_ENV === "production") {
        // TODO - send the production email, like this:
        // await postmark.sendEmail(msg)

        const mailjet = require("node-mailjet").connect(
          process.env.MAILJET_API_1,
          process.env.MAILJET_API_2
        )

        await mailjet.post("send", { version: "v3.1" }).request({
          Messages: [
            {
              From: { Email: "skorotkiewicz@gmail.com", Name: "Movie Scrobbler" },
              To: [{ Email: to }],
              Subject: "Your Password Reset Instructions",
              HTMLPart: `<h1>Reset Your Password</h1>
              <p>To reset your password on Movie Scrobbler, click on the link below, or ignore this email if you did not request a password reset.</p>
              <p>
                <a href="${resetUrl}">
                  Click here to set a new password
                </a>
              </p>
              <p>
                <a href="https://movie-scrobbler.herokuapp.com/">
                  Movie Scrobbler Website
                </a>
              </p>
              `,
            },
          ],
        })

        // throw new Error("No production email implementation in mailers/forgotPasswordMailer")
      } else {
        // Preview email in the browser
        await previewEmail(msg)
      }
    },
  }
}
