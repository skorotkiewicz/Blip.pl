import { Suspense } from "react"
import { Head, useQuery, useParam, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import getStatus from "app/statuses/queries/getStatus"
import StaticLinks from "app/core/components/StaticLinks"
import StatusComp from "app/core/components/StatusComp"
import Loading from "app/core/components/Loading"
import Footer from "app/core/components/Footer"
import Header from "app/core/components/Header"

// import FriendsBox from "app/core/components/FriendsBox"
// import AboutTop from "app/core/components/AboutTop"
// import Recommendations from "app/core/components/RecommendationsBox"
// import TagcloudBox from "app/core/components/TagcloudBox"
// import { useCurrentUser } from "app/core/hooks/useCurrentUser"
// import getFollows from "app/statuses/queries/getFollows"

export const Status = () => {
  const statusId = useParam("statusId", "number")
  const [status] = useQuery(getStatus, { id: statusId })
  // const currentUser = useCurrentUser()
  // const [friends] = useQuery(getFollows, { id: currentUser?.id })

  return (
    <>
      <div>
        <div id="full" className="full-container-high">
          <div id="main" className="clearfix">
            <Header />

            <div id="content" className="foreign-dashboard">
              <ul id="dashboard-updates">
                <StatusComp
                  key={status.id}
                  id={status.id}
                  username={status.User?.name}
                  avatar={`/${status.User?.avatar}`}
                  status={status.status}
                  photo={false}
                  date={status.createdAt}
                  transport="WWW"
                  setReply={null}
                  isPublic={status.isPublic}
                />
              </ul>
            </div>

            <div id="sidebar">
              {/* {currentUser ? (
                <FriendsBox friends={friends} user={currentUser} />
              ) : (
                <>
                  <AboutTop />
                  <Recommendations />
                  <TagcloudBox />
                </>
              )} */}

              <Footer />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const ShowStatusPage: BlitzPage = () => {
  return (
    <div>
      <Head>
        <title>Status</title>
      </Head>

      <Suspense fallback={<Loading />}>
        <Status />
      </Suspense>
    </div>
  )
}

ShowStatusPage.authenticate = false
ShowStatusPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowStatusPage
