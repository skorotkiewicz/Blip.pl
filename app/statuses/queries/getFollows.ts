import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const GetFollows = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(GetFollows),
  /*resolver.authorize(),*/ async ({ id }) => {
    const Followers = await db.follows.count({ where: { followingId: id } })
    const Following = await db.follows.count({ where: { followerId: id } })
    const follows = await db.follows.findMany({
      where: { followingId: id },
      include: {
        follower: {
          select: {
            name: true,
            avatar: true,
          },
        },
      },
    })
    const followings = await db.follows.findMany({
      where: { followerId: id },
      include: {
        following: {
          select: {
            name: true,
            avatar: true,
          },
        },
      },
    })

    // if (!follows) throw new NotFoundError()

    return { Followers, Following, follows, followings }
  }
)
