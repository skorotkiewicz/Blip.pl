import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetStatus = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(
  resolver.zod(GetStatus),
  /*resolver.authorize(),*/ async ({ id }, ctx) => {
    const status = await db.status.findFirst({
      where: {
        // jezeli status jest {to: null}
        // jezeli nadawca = ctx.session.userId
        // jezeli odbiorca = ctx.session.userId

        OR: [
          { id, to: null },
          { id, userId: ctx.session.userId },
          { id, to: ctx.session.userId },
        ],
      },
      include: {
        User: {
          select: {
            name: true,
            avatar: true,
          },
        },
      },
    })

    if (!status) throw new NotFoundError()

    return status
  }
)
