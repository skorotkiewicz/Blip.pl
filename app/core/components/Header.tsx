import React from "react"
import { useRouter } from "blitz"
import StaticLinks from "app/core/components/StaticLinks"

const Header = () => {
  const router = useRouter()
  return (
    <div id="top" className="top-high">
      <StaticLinks />
      {/* <div id="logo-large"></div> */}
      <div
        id="logo-large"
        onClick={() => {
          router.push(`/dashboard`)
        }}
      ></div>
      <div id="blip"></div>
    </div>
  )
}

export default Header
