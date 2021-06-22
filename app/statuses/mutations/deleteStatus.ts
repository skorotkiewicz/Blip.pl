import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteStatus = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(DeleteStatus),
  resolver.authorize(),
  async ({ id }, ctx) => {
    const isUserStatus = await db.status.findFirst({ where: { id }, include: { User: true } })
    if (!isUserStatus) throw new NotFoundError()

    if (isUserStatus.User?.id === ctx.session.userId) {
      const status = await db.status.deleteMany({ where: { id } })
      return status
    } else {
      return "ale czekaj, to nie jest twój wpis..."
    }
  }
)
