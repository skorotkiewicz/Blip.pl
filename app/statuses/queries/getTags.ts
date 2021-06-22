import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetStatusesInput
  extends Pick<Prisma.StatusFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  // resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetStatusesInput) => {
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
            status: {
              contains: `#${where.tagName}`,
            },
          },
        }),
      query: (paginateArgs) =>
        db.status.findMany({
          ...paginateArgs,
          where: {
            status: {
              contains: `#${where.tagName}`,
            },
          },
          orderBy,
          include: { User: true },
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
