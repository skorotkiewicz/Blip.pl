import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateStatus = z.object({
  status: z.string().min(1).max(160),
})

export default resolver.pipe(
  resolver.zod(CreateStatus),
  resolver.authorize(),
  async (input, ctx) => {
    let PM: RegExpMatchArray | undefined | null = null
    let DM: RegExpMatchArray | undefined | null = null
    let to: number | undefined | null = null
    let isPublic: boolean = true
    let isOkay: boolean = true
    let isBanned: boolean = false
    let isBlock: boolean = false
    let status: string = ""

    try {
      const getUserId = async (id) => {
        const res = await db.user.findFirst({
          where: { name: id },
          select: { id: true },
        })
        const isBlocked = await db.blocked.count({
          where: { userId: res?.id, blockedId: ctx.session.userId },
        })

        if (!res) isOkay = false
        else if (isBlocked !== 0) {
          isOkay = false
          isBlock = true
        } else to = res?.id
        return
      }

      const isBan = await db.user.findFirst({
        where: { id: ctx.session.userId },
        select: { banned: true },
      })
      if (isBan?.banned) {
        isOkay = false
        isBanned = true
      }

      let userInput = input.status.replace(/\n/g, " ").trim()

      // create PM (Private message) [Private]
      // >>ala jak się masz?
      PM = userInput.match(/^>>([\w]+) (.*)$/)

      // create DM (Direct message) [Public]
      // >ala jak się masz?
      DM = userInput.match(/^>([\w]+) (.*)$/)

      if (PM) {
        await getUserId(PM[1])
        isPublic = false
        status = `>> ^${PM[1]} ${PM[2]}`
      } else if (DM) {
        await getUserId(DM[1])
        isPublic = true
        status = `> ^${DM[1]} ${DM[2]}`
      } else {
        status = userInput
      }
    } catch (e) {}

    if (isOkay) {
      const newStatus = await db.status.create({
        data: {
          status,
          userId: ctx.session.userId,
          to,
          isPublic,
        },
      })

      return newStatus
    } else {
      if (isBlock) {
        throw {
          name: "error",
          message: "Użytkownika nie chce otrzymywać wiadomości od ciebie",
        }
      } else if (isBanned) {
        throw {
          name: "error",
          message:
            "Nie możesz publikować, ponieważ zostałeś zbanowany przez moderację. Aby rozwiązać ten problem napisz maila do skorotkiewicz@gmail.com. Przez rozmowę dojdziemy do wspólnego porozumienia, abyś znów mógł cieszyć się z Blipa!",
        }
      } else {
        throw {
          name: "error",
          message: "Nie zaleziono użytkownika",
        }
      }
    }
  }
)
