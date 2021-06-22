import { resolver, SecurePassword } from "blitz"
import db from "db"
import { Signup } from "app/auth/validations"
import { Role } from "types"

export default resolver.pipe(resolver.zod(Signup), async ({ name, email, password }, ctx) => {
  const hashedPassword = await SecurePassword.hash(password.trim())
  const user = await db.user.create({
    data: {
      name: name.toLowerCase(),
      email: email.toLowerCase().trim(),
      hashedPassword,
      role: "USER",
    },
    select: { id: true, name: true, email: true, role: true, avatar: true },
  })

  await ctx.session.$create({ avatar: user.avatar, name, userId: user.id, role: user.role as Role })

  await db.status.create({
    data: {
      status:
        "🚀 Witaj na Blipie! Kliknij `Pomoc` aby sprawdzić jak w pełni korzystać z portalu! 😀",
      userId: 1,
      to: user.id,
      isPublic: false,
    },
  })

  return user
})
