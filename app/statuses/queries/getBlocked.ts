import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const GetBlocked = z.object({
  id: z.number().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetBlocked), async ({ id }, ctx) => {
  const isBlocked = await db.blocked.count({
    where: {
      blockedId: id,
      userId: ctx.session.userId,
    },
  })

  return { isBlocked }
})
