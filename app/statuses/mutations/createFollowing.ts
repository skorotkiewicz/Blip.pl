import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateFollowing = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(CreateFollowing),
  resolver.authorize(),
  async (input, ctx) => {
    const isFollowing = await db.follows.findFirst({
      where: {
        followingId: input.id,
        followerId: ctx.session.userId,
      },
    })

    if (!isFollowing) {
      // obsweruj
      const follows = await db.follows.create({
        data: {
          followingId: input.id,
          followerId: ctx.session.userId,
        },
      })
      return follows
    } else {
      // od-obserwuj
      const follows = await db.follows.deleteMany({
        where: {
          followingId: input.id,
          followerId: ctx.session.userId,
        },
      })
      return follows
    }
  }
)
