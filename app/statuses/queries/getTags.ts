import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetStatusesInput
  extends Pick<Prisma.StatusFindManyArgs, any | "orderBy" | "skip" | "take"> {}
// extends Pick<Prisma.StatusFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  // resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetStatusesInput) => {

    let tag = `#${where?.tagName}`

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
              contains: tag,
            },
          },
        }),
      query: (paginateArgs) =>
        db.status.findMany({
          ...paginateArgs,
          where: {
            status: {
              contains: tag,
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
