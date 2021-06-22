import { Suspense, useState } from "react"
import { Head, useMutation, BlitzPage, useQuery, Link, useRouter } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import getUser from "app/users/queries/getUser"
import saveOptions from "app/statuses/mutations/saveOptions"
import Loading from "app/core/components/Loading"
import Header from "app/core/components/Header"

export const Options = () => {
  const currentUser = useCurrentUser()
  const [saveOptionsMutation] = useMutation(saveOptions)
  const [user] = useQuery(getUser, { name: currentUser?.name })
  const router = useRouter()

  const [avatar, setAvatar] = useState(user.avatar)
  const [fullName, setFullName] = useState(user.fullName)
  const [local, setLocal] = useState(user.local)
  const [www, setWww] = useState(user.www)
  const [about, setAbout] = useState(user.about)
  const [wallpaper, setWallpaper] = useState(user.wallpaper)
  const [error, setError] = useState("")

  const _save = async () => {
    try {
      let save = await saveOptionsMutation({
        avatar,
        fullName,
        local,
        www,
        about,
        wallpaper,
      })
      setError("Okay")
      return save
    } catch (error) {
      return setError(error.toString())
    }
  }

  return (
    <div id="full" className="full-container-high">
      <div id="main" className="clearfix">
        <Header />

        <div id="content" style={{ backgroundColor: "#fff", borderRadius: "10px", padding: 10 }}>
          <h2>Ustawienia</h2>
          <p>
            <Link href="/change-password">
              <a>Zmiana hasła</a>
            </Link>
          </p>
          <p>
            Avatar <br />
            <input
              name="avatar"
              value={avatar}
              onChange={(e) => {
                setAvatar(e.target.value)
              }}
            />
          </p>
          <p>
            Wallpaper <br />
            <input
              name="wallpaper"
              value={wallpaper}
              onChange={(e) => {
                setWallpaper(e.target.value)
              }}
            />
          </p>

          <p>
            Full Name <br />
            <input
              name="fullName"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value)
              }}
            />
          </p>
          <p>
            Localization <br />
            <input
              name="local"
              value={local}
              onChange={(e) => {
                setLocal(e.target.value)
              }}
            />
          </p>
          <p>
            Website <br />
            <input
              name="www"
              value={www}
              onChange={(e) => {
                setWww(e.target.value)
              }}
            />
          </p>
          <p>
            About <br />
            <input
              name="about"
              value={about}
              onChange={(e) => {
                setAbout(e.target.value)
              }}
            />
          </p>
          <p style={{ color: "red" }}>{error}</p>
          <button onClick={_save}>Save</button>
        </div>
      </div>
    </div>
  )
}

const OptionsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Options</title>
      </Head>

      <div>
        <Suspense fallback={<Loading />}>
          <Options />
        </Suspense>
      </div>
    </>
  )
}

OptionsPage.authenticate = true
OptionsPage.getLayout = (page) => <Layout>{page}</Layout>

export default OptionsPage
