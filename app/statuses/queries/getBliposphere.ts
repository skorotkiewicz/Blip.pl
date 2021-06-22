import { resolver } from "blitz"
import db from "db"

export default resolver.pipe(async () => {
  const results = await db.status.findMany({
    where: { to: null },
    // where: { isPublic: true },
    orderBy: {
      id: "desc",
    },
    take: 15,
    include: {
      User: {
        select: {
          name: true,
          avatar: true,
        },
      },
    },
  })

  return { results }
})
