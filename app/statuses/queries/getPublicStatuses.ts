import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetStatusesInput
  extends Pick<Prisma.StatusFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  // resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetStatusesInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant

    // const kogoObserwuje = db.follows.findMany({
    //   where: { followerId: 2 },
    // })

    // const test = db.status.findMany({
    //   where: {
    //     userId: {
    //       in: 2,
    //     },
    //   },
    //   orderBy: { id: "desc" },
    //   include: { User: { select: { name: true, avatar: true } } },
    // })

    const {
      items: statuses,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.status.count({ where: { userId: where?.userId, isPublic: true } }),
      query: (paginateArgs) =>
        db.status.findMany({
          ...paginateArgs,
          where: { userId: where?.userId, isPublic: true },
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
