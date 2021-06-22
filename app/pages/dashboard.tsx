import { Suspense, useState } from "react"
import { Head, usePaginatedQuery, useRouter, BlitzPage, useQuery, Link } from "blitz"
import Layout from "app/core/layouts/Layout"
import getStatuses from "app/statuses/queries/getStatuses"
import StatusForm from "app/pages/NewStatus"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import getFollows from "app/statuses/queries/getFollows"
import StatusComp from "app/core/components/StatusComp"
import FriendsBox from "app/core/components/FriendsBox"
import Pagination from "app/core/components/Pagination"
import UtilsBox from "app/core/components/UtilsBox"
import AboutTop from "app/core/components/AboutTop"
import Recommendations from "app/core/components/RecommendationsBox"
import TagcloudBox from "app/core/components/TagcloudBox"
import Loading from "app/core/components/Loading"
import Footer from "app/core/components/Footer"
import Header from "app/core/components/Header"

const ITEMS_PER_PAGE = 20

export const StatusesList = () => {
  const currentUser = useCurrentUser()

  if (!currentUser) {
    // HACK to work login from index page FIXME for better functionality
    location.reload(true)
  }

  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ statuses, hasMore }, { refetch }] = usePaginatedQuery(getStatuses, {
    where: { userId: currentUser?.id },
    orderBy: { id: "desc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })
  const [friends] = useQuery(getFollows, { id: Number(currentUser?.id) })
  const [reply, setReply] = useState("")

  return (
    <div id="full" className="full-container-high">
      <div id="main" className="clearfix">
        <Header />

        <div id="content" className="foreign-dashboard">
          <StatusForm reply={reply} refetch={refetch} />

          {/* <UtilsBox tag="test" /> */}

          <ul id="dashboard-updates">
            {statuses.map((status) => (
              <StatusComp
                key={status.id}
                id={status.id}
                username={status.User.name}
                avatar={status.User.avatar}
                status={status.status}
                photo={false}
                date={status.createdAt}
                transport={status.transport}
                setReply={setReply}
                isPublic={status.isPublic}
              />
            ))}
          </ul>

          <Pagination router={router} page={page} hasMore={hasMore} />
        </div>

        <div id="sidebar">
          {currentUser ? (
            <FriendsBox friends={friends} user={currentUser} />
          ) : (
            <>
              <AboutTop />
              <Recommendations />
              <TagcloudBox />
            </>
          )}
          <Footer />
        </div>
      </div>
    </div>
  )
}

const StatusesPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>

      <div>
        <Suspense fallback={<Loading />}>
          <StatusesList />
        </Suspense>
      </div>
    </>
  )
}

StatusesPage.authenticate = true
StatusesPage.getLayout = (page) => <Layout>{page}</Layout>

export default StatusesPage
