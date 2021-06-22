import { createElement } from "react"

export const parser = (text) => {
  //   let hashtag = /(#[\S]+)/g
  let hashtag = /(#[\w]+)/g
  let user = /(\^[\w]+)/g
  let blip = /(\/s\/[\d]+)/g
  let url = /(\b(https?):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi

  return text.split(hashtag).map((chunk) => {
    return chunk.split(user).map((chunk) => {
      return chunk.split(blip).map((chunk) => {
        return chunk.split(url).map((chunk) => {
          if (chunk.match(hashtag)) {
            return createElement("a", { href: `/tags/${chunk.replace("#", "")}` }, chunk)
          }
          if (chunk.match(user)) {
            return createElement("a", { href: `/blog/${chunk.replace("^", "")}` }, chunk)
          }
          if (chunk.match(blip)) {
            return createElement("a", { href: chunk }, " [blip] ")
          }
          if (chunk.match(url)) {
            return createElement("a", { href: chunk }, " [link] ")
            // return createElement("a", { href: chunk }, chunk)
          }
          if (chunk === "http" || chunk === "https") {
            return ""
          }

          return chunk
        })
      })
    })
  })
}
