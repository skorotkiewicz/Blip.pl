import { ReactNode } from "react"
import { Head } from "blitz"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || "BLIP - Bardzo Lubię Informować Przyjaciół"}</title>

        <link rel="shortcut icon" href="/images/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/images/favicon.gif" type="image/gif" />
      </Head>

      {children}
    </>
  )
}

export default Layout
