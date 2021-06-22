import { Suspense } from "react"
import { Head, usePaginatedQuery, useRouter, BlitzPage, useQuery, useParam, Link } from "blitz"
import Layout from "app/core/layouts/Layout"
import getStatuses from "app/statuses/queries/getStatuses"
import getFollows from "app/statuses/queries/getFollows"
import StatusComp from "app/core/components/StatusComp"
import FriendsBox from "app/core/components/FriendsBox"
import Pagination from "app/core/components/Pagination"
import AboutTop from "app/core/components/AboutTop"
import Recommendations from "app/core/components/RecommendationsBox"
import TagcloudBox from "app/core/components/TagcloudBox"
import Loading from "app/core/components/Loading"
import getUser from "app/users/queries/getUser"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import Footer from "app/core/components/Footer"
import Header from "app/core/components/Header"

const ITEMS_PER_PAGE = 20

export const UserDashboard = () => {
  const userName: any = useParam("userName", "string")
  const [user] = useQuery(getUser, { name: userName })

  const currentUser = useCurrentUser()
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ statuses, hasMore }] = usePaginatedQuery(getStatuses, {
    where: { userId: user.id },
    orderBy: { id: "desc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })
  const [friends] = useQuery(getFollows, { id: user.id })

  return (
    <div id="full" className="full-container-high">
      <div id="main" className="clearfix">
        <Header />

        <div id="content" className="foreign-dashboard">
          <ul id="dashboard-updates">
            {statuses.map((status) => (
              <StatusComp
                key={status.id}
                id={status.id}
                username={status.User?.name}
                avatar={status.User?.avatar}
                status={status.status}
                photo={false}
                date={status.createdAt}
                transport={status.transport}
                setReply={null}
                isPublic={status.isPublic}
              />
            ))}
          </ul>

          <Pagination router={router} page={page} hasMore={hasMore} />
        </div>

        <div id="sidebar">
          {currentUser ? (
            <FriendsBox friends={friends} user={user} />
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

const UserStatusPage: BlitzPage = () => {
  const userName: any = useParam("userName", "string")

  return (
    <>
      <Head>
        <title>{"Blog " + userName + "`s - Dashboard"}</title>
      </Head>

      <div>
        <Suspense fallback={<Loading />}>
          <UserDashboard />
        </Suspense>
      </div>
    </>
  )
}

UserStatusPage.authenticate = true
UserStatusPage.getLayout = (page) => <Layout>{page}</Layout>

export default UserStatusPage
