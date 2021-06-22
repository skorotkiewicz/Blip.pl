import { Suspense } from "react"
import { BlitzPage, useRouter } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import StaticLinks from "app/core/components/StaticLinks"
import Recommendations from "app/core/components/RecommendationsBox"
import TagcloudBox from "app/core/components/TagcloudBox"
import Bliposphere from "app/core/components/Bliposphere"
import SignupForm from "app/auth/components/_SignupForm"
import LoginForm from "app/auth/components/_LoginForm"
import UserBox from "app/core/components/UserBox"
import Loading from "app/core/components/Loading"
import Footer from "app/core/components/Footer"

const Home: BlitzPage = () => {
  const currentUser = useCurrentUser()
  const router = useRouter()

  return (
    <div id="full" className="full-container-high">
      <div id="main" className="clearfix">
        <div id="top" className="top-high">
          <StaticLinks />

          <div
            id="logo-large"
            onClick={() => {
              router.push(`/dashboard`)
            }}
          ></div>
          <div id="blip"></div>
        </div>

        {!currentUser && (
          <div id="teaser">
            <SignupForm onSuccess={() => router.push("/dashboard")} />
          </div>
        )}

        <div id="content">
          <Suspense fallback={<Loading />}>
            <Bliposphere />
          </Suspense>
        </div>

        <div id="sidebar">
          {!currentUser ? (
            <div id="login-form-container" className="teaser-contra">
              <div id="login-form">
                <div id="login-form-content">
                  {/* <LoginForm onSuccess={() => router.push("/dashboard")} /> */}
                  <LoginForm
                    onSuccess={() => {
                      const next = router.query.next
                        ? decodeURIComponent(router.query.next as string)
                        : "/dashboard"
                      router.push(next)
                    }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <UserBox user={currentUser} />
          )}
          <Recommendations />
          <TagcloudBox />
          <Footer />
        </div>
      </div>
    </div>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
