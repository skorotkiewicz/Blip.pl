/* eslint-disable @next/next/no-css-tags */
import { Suspense } from "react"
import { Head, usePaginatedQuery, useRouter, BlitzPage, useParam } from "blitz"
import Layout from "app/core/layouts/Layout"
import getTags from "app/statuses/queries/getTags"
import StatusComp from "app/core/components/StatusComp"
import UtilsBox from "app/core/components/UtilsBox"
import Pagination from "app/core/components/Pagination"
import Loading from "app/core/components/Loading"
import Footer from "app/core/components/Footer"
import Header from "app/core/components/Header"

const ITEMS_PER_PAGE = 20

export const TagsList = () => {
  const tagName: any = useParam("tagName", "string")
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ statuses, hasMore }] = usePaginatedQuery(getTags, {
    where: { tagName },
    orderBy: { id: "desc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  return (
    <div id="full" className="full-container-high">
      <div id="main" className="clearfix">
        <Header />

        <div id="content" className="foreign-dashboard">
          <UtilsBox tag={tagName} />

          <ul id="dashboard-updates">
            {statuses.map((status) => (
              <StatusComp
                key={status.id}
                id={status.id}
                username={status.User?.name}
                avatar={`/${status.User?.avatar}`}
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
  )
}

const TagPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Statusy oznaczone tagiem</title>
      </Head>

      <div>
        <Suspense fallback={<Loading />}>
          <TagsList />
        </Suspense>
      </div>
    </>
  )
}

TagPage.authenticate = false
TagPage.getLayout = (page) => <Layout>{page}</Layout>

export default TagPage
