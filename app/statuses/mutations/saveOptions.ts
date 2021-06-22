import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const SaveOptions = z.object({
  // wallpaper: z.string().max(255),
  avatar: z.string().max(255),
  fullName: z.string().max(255),
  local: z.string().max(255),
  www: z.string().max(255),
  // www: z.string().max(255).url() || null || undefined,
  about: z.string().max(255),
})

export default resolver.pipe(
  resolver.zod(SaveOptions),
  resolver.authorize(),
  async (input, ctx) => {
    const user = await db.user.update({
      where: { id: ctx.session.userId },
      data: {
        // wallpaper: input.wallpaper,
        avatar: input.avatar,
        fullName: input.fullName,
        local: input.local,
        www: input.www,
        about: input.about,
      },
    })

    return user
  }
)
