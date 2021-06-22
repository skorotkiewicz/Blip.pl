import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateBlocked = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(CreateBlocked),
  resolver.authorize(),
  async (input, ctx) => {
    const isBlocked = await db.blocked.count({
      where: {
        blockedId: input.id,
        userId: ctx.session.userId,
      },
    })

    if (isBlocked === 0) {
      // zablokuj
      const block = await db.blocked.create({
        data: {
          blockedId: input.id,
          userId: ctx.session.userId,
        },
      })
      return block
    } else {
      // odblokuj
      const block = await db.blocked.deleteMany({
        where: {
          blockedId: input.id,
          userId: ctx.session.userId,
        },
      })
      return block
    }
  }
)
