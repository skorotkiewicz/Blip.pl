import { Ctx } from "blitz"
import db from "db"

// eslint-disable-next-line no-unused-vars
export default async function getCurrentUser(_ = null, { session }: Ctx) {
  if (!session.userId) return null

  const user = await db.user.findFirst({
    where: { id: session.userId },
    select: { id: true, name: true, email: true, role: true, avatar: true },
  })

  return user
}
