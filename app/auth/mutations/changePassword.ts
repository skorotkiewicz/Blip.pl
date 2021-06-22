/* eslint-disable no-throw-literal */
import { NotFoundError, SecurePassword, resolver } from "blitz"
import db from "db"
import { authenticateUser } from "./login"
import { ChangePassword } from "../validations"

export default resolver.pipe(
  resolver.zod(ChangePassword),
  resolver.authorize(),
  async ({ currentPassword, newPassword, passwordConfirmation }, ctx) => {
    if (newPassword !== passwordConfirmation) {
      throw {
        name: "ChangePasswordError",
        message: "Nowe hasło nie jest zgodne z hasłem potwierdzającym.",
      }
    }

    const user = await db.user.findFirst({ where: { id: ctx.session.userId! } })
    if (!user) throw new NotFoundError()

    try {
      await authenticateUser(user.email, currentPassword)
    } catch (error) {
      throw {
        name: "ChangePasswordError",
        message: "Aktualne hasło nie jest prawidłowe.",
      }
    }

    const hashedPassword = await SecurePassword.hash(newPassword.trim())
    await db.user.update({
      where: { id: user.id },
      data: { hashedPassword },
    })

    return true
  }
)
