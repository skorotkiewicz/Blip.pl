import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetStatusesInput
  extends Pick<Prisma.StatusFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetStatusesInput, ctx) => {
    const kogoObserwuje = await db.follows.findMany({
      where: { followerId: ctx.session.userId },
      select: { followingId: true },
    })

    const {
      items: statuses,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () =>
        db.status.count({
          where: {
            OR: [
              { userId: ctx.session.userId },
              { userId: where?.userId, isPublic: true },
              { to: ctx.session.userId },
              {
                User: {
                  id: { in: [...kogoObserwuje.map((user) => user.followingId)] },
                },
                isPublic: true,
              },
            ],
          },
        }),
      query: (paginateArgs) =>
        db.status.findMany({
          ...paginateArgs,
          // pobierz autora wpisy, do uzytkownika i obserwowane public posts
          where: {
            OR: [
              { userId: ctx.session.userId },
              { userId: where?.userId, isPublic: true },
              { to: ctx.session.userId },
              {
                User: {
                  id: { in: [...kogoObserwuje.map((user) => user.followingId)] },
                },
                isPublic: true,
              },
            ],
          },
          orderBy,
          include: {
            User: {
              select: {
                name: true,
                avatar: true,
              },
            },
          },
        }),
    })

    return {
      statuses,
      nextPage,
      hasMore,
      count,
    }
  }
)
