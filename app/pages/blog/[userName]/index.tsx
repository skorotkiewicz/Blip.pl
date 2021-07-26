import { Suspense } from "react"
import {
  Link,
  Image,
  useParam,
  useQuery,
  Head,
  BlitzPage,
  usePaginatedQuery,
  useRouter,
} from "blitz"
import getUser from "app/users/queries/getUser"
import Layout from "app/core/layouts/Layout"
import getStatuses from "app/statuses/queries/getPublicStatuses"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import getFollows from "app/statuses/queries/getFollows"
import FriendsBox from "app/core/components/FriendsBox"
import Loading from "app/core/components/Loading"
import moment from "moment"

const ITEMS_PER_PAGE = 20

export const UserProfile = () => {
  const currentUser = useCurrentUser()
  const userName: any = useParam("userName", "string")
  const [user] = useQuery(getUser, { name: userName })

  let avatar: string = "default.png"
  if (user.avatar === "default.png") {
    avatar = "/default_large.png"
  } else {
    avatar = user.avatar
  }

  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ statuses /*, hasMore */ }] = usePaginatedQuery(getStatuses, {
    where: { userId: user.id },
    orderBy: { id: "desc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  let lastDay

  const [friends] = useQuery(getFollows, { id: user.id })

  // let T_lastDay
  // let T_lastDayArray = []
  // statuses.forEach((e) => {
  //   if (T_lastDay !== moment(e.createdAt).format("dddd, d MMMM YYYY")) {
  //     T_lastDay = moment(e.createdAt).format("dddd, d MMMM YYYY")
  //     T_lastDayArray.push(T_lastDay)
  //     T_lastDayArray.push(e)
  //   } else {
  //     T_lastDayArray.push(e)
  //   }
  // })

  // console.log(T_lastDayArray)

  return (
    <div id="full">
      <div id="info">
        <div id="background">
          {!currentUser && (
            <span id="register">
              <Link href="/login">zaloguj się</Link> lub <Link href="/signup">załóż konto</Link>
            </span>
          )}
        </div>
        <div id="logo">
          <Link href="/dashboard">
            <a id="logo-link">&nbsp;</a>
          </Link>
        </div>
      </div>
      <div id="blog-container" className="clearfix">
        <div className="clearfix" id="main-container">
          <div id="main">
            <div id="blog-profile-container">
              <div id="blog-profile">
                <div className="avatar">
                  <Image src={`${avatar}`} alt={`${user.name} - avatar`} width="120" height="120" />
                  <Link href={`/blog/${user.name}/dashboard`}>
                    <a>kokpit</a>
                  </Link>
                  <a href="#">rss</a>
                </div>

                <div id="data">
                  <h2>{user.name}</h2>
                  <dl>
                    {user.fullName && (
                      <>
                        <dt>Imię i nazwisko</dt>
                        <dd>{user.fullName}</dd>
                      </>
                    )}
                    {user.local && (
                      <>
                        <dt>Lokalizacja</dt>
                        <dd>{user.local}</dd>
                      </>
                    )}
                    {user.www && (
                      <>
                        <dt>WWW</dt>
                        <dd className="last">{user.www}</dd>
                      </>
                    )}
                  </dl>

                  {user.about && <p>{user.about}</p>}
                </div>
              </div>
            </div>

            <div id="blog-container">
              <div id="blog">
                <ul id="days">
                  {statuses.map((status, key) => (
                    <li key={key}>
                      <div className="day-container clearfix">
                        <div className="day">
                          {lastDay !== moment(status.createdAt).format("dddd, d MMMM YYYY") && (
                            <h2>
                              <span>
                                {(lastDay = moment(status.createdAt).format("dddd, d MMMM YYYY"))}
                              </span>
                            </h2>
                          )}

                          <ul className="statuses">
                            <li key={key}>
                              <p className="date">
                                <Link href={`/s/${status.id}`}>
                                  <a>{moment(status.createdAt).format("HH:mm")}</a>
                                </Link>
                              </p>
                              <p className="body">{status.status}</p>
                              <div className="photo"> </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div id="sidebar">
            <div className="side-box-container" id="archives">
              <div className="side-box">
                <div className="content">
                  <h2>Archiwa</h2>

                  <ul className="archive-months">
                    <li>
                      <h3 style={{ color: "red" }}>
                        <span>[WIP] Już niedługo</span>
                      </h3>
                    </li>
                  </ul>

                  {/* <h3>
                    <span>2009</span>
                  </h3>
                  <ul className="archive-months">
                    <li>
                      <a
                        href="https://web.archive.org/web/20100108212735/http://devblogi.blip.pl/archive/8/2009"
                        className="blog-archive-link"
                      >
                        sierpień
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://web.archive.org/web/20100108212735/http://devblogi.blip.pl/archive/12/2009"
                        className="blog-archive-link"
                      >
                        grudzień
                      </a>
                    </li>
                  </ul>
                  <h3>
                    <span>2010</span>
                  </h3>
                  <ul className="archive-months">
                    <li>
                      <a
                        href="https://web.archive.org/web/20100108212735/http://devblogi.blip.pl/archive/1/2010"
                        className="blog-archive-link"
                      >
                        styczeń
                      </a>
                    </li>
                  </ul> */}
                </div>
              </div>
            </div>

            <FriendsBox friends={friends} user={null} />
          </div>
        </div>
      </div>

      <style jsx>{`
        table {
          font-size: inherit;
          font: 100%;
        }

        pre,
        code,
        kbd,
        samp,
        tt {
          font-family: monospace;
          *font-size: 108%;
          line-height: 100%;
        }

        .clearfix:after {
          content: ".";
          display: block;
          height: 0;
          clear: both;
          visibility: hidden;
        }
        * {
          margin: 0;
          padding: 0;
        }

        body {
          font: 13px/1.231 arial, helvetica, clean, sans-serif;
          *font-size: small;
          *font: x-small;
          background: url(/wallpaper.jpg) center 0 fixed;
        }
        a {
          text-decoration: none;
        }

        a img {
          border: 0;
        }

        ul {
          list-style-type: none;
        }

        div#full div#main {
          margin-left: auto;
          margin-right: auto;
          width: 800px;
        }
        div#full div#background {
          margin-top: 15px;
          background: url(/top.png) 0 100% repeat-x;
          width: 100%;
          position: relative;
          height: 30px;
        }
        div#full div#background span#register {
          float: right;
          margin-right: 235px;
          color: #fff;
          line-height: 30px;
        }
        div#full div#background span#register a {
          font-weight: bold;
          color: #fff;
        }
        div#full div#info {
          height: 55px;
        }

        div#full div#info div#logo {
          position: relative;
          top: -39px;
          left: 230px;
          height: 53px;
          width: 79px;
        }
        div#full div#info div#logo a#logo-link {
          background: url(/logo-small.png) no-repeat;
          display: block;
          height: 53px;
          width: 79px;
        }
        div#blog ul#days div.day ul.statuses li p.body a.rdir_stats {
          font-size: 9px;
          margin-left: 2px;
        }

        div#blog-container div#main-container {
          width: 800px;
          margin: 10px auto;
        }
        div#blog-container div#main {
          float: left;
          width: 530px;
        }
        div#blog-container div#sidebar {
          margin-left: 547px;
        }
        div#blog-container div#blog-profile-container {
          background: url(/blog-profile-top.png) top left no-repeat;
          margin-bottom: 16px;
          padding-top: 1px;
          width: 527px;
        }
        div#blog-container div#blog-profile {
          background: url(/blog-profile.gif) top left repeat-x;
          height: 148px;
          overflow: hidden;
          width: 527px;
        }
        div#blog-container div#blog-profile div.avatar {
          float: left;
          padding: 6px;
          width: 120px;
          height: 120px;
        }
        div#blog-container div#blog-profile div.avatar img {
          height: 120px;
          width: 120px;
        }
        div#blog-container div#blog-profile div.avatar a {
          color: #ff5b00;
          display: block;
          float: left;
          font-size: 108%;
          font-weight: bold;
          text-align: center;
          padding: 1px;
          width: 58px;
        }
        div#blog-container div#blog-profile div.avatar a:hover {
          text-decoration: underline;
        }
        div#blog-container div#blog-profile div#data {
          padding-top: 2px;
        }
        div#blog-container div#blog-profile div#data h2 {
          font-family: Trebuchet MS, sans;
          font-size: 161.5%;
          margin: 0pt 0pt 2px 6px;
        }
        div#blog-container div#blog-profile div#data dl {
          font-size: 85%;
          line-height: 16px;
        }
        div#blog-container div#blog-profile div#data dl dt {
          color: #454545;
          float: left;
          text-transform: uppercase;
          width: 100px;
        }
        div#blog-container div#blog-profile div#data dl dd a {
          color: #ff5b00;
        }
        div#blog-container div#blog-profile div#data dl dd a:hover {
          text-decoration: underline;
        }
        div#blog-container div#blog-profile div#data p {
          font-size: 85%;
          padding: 2px;
          margin-top: 6px;
        }
        div#blog-container div#blog-container {
          background: url(/blog-bottom.png) bottom left no-repeat;
          font-family: Georgia, sans-serif;
          padding-bottom: 2px;
          width: 527px;
        }
        div#blog-container div#blog {
          background: url(/blog-top.png) top left no-repeat;
          padding-top: 2px;
        }
        div#blog-container div#blog ul#days {
          background: url(/blog.png) top left repeat;
          width: 527px;
          padding-top: 5px;
        }
        div#blog-container div#blog ul#days div.day-container {
          padding-bottom: 5px;
        }
        div#blog-container div#blog ul#days div.day {
          background: url(/blog-day-bottom.png) bottom left no-repeat;
          margin: 0 6px;
          padding-bottom: 2px;
        }
        div#blog-container div#blog ul#days div.day h2 {
          background: url(/blog-day-header.png) top left no-repeat;
          color: #777;
          font-size: 100%;
          text-align: right;
          height: 35px;
        }
        div#blog-container div#blog ul#days div.day h2 span {
          display: block;
          padding: 10px 8px 0 0;
        }
        div#blog-container div#blog ul#days div.day ul.statuses {
          background: url(/blog-day.gif) top left repeat-x #fff;
          text-align: center;
        }
        div#blog-container div#blog ul#days div.day ul.statuses li {
          display: block;
          clear: both;
          padding-bottom: 5px;
          width: 514px;
        }
        div#blog-container div#blog ul#days div.day ul.statuses li p.date {
          float: left;
          line-height: 116%;
          padding-left: 14px;
          width: 40px;
        }
        div#blog-container div#blog ul#days div.day ul.statuses li p.date a {
          color: #777777;
          text-decoration: none;
        }
        div#blog-container div#blog ul#days div.day ul.statuses li p.body {
          color: #444;
          font-size: 116%;
          margin-left: 56px;
          text-align: left;
          width: 446px;
        }
        div#blog-container div#blog ul#days div.day ul.statuses li p.body a {
          color: #ff5b00;
        }
        div#blog-container div#blog ul#days div.day ul.statuses li p.body a:hover {
          text-decoration: underline;
        }
        div#blog-container div#sidebar div.side-box-container {
          background: url(/side-box-top.png) top left no-repeat;
          padding-top: 2px;
          width: 249px;
        }
        div#blog-container div#sidebar div.side-box {
          background: url(/side-box-bottom.png) bottom left no-repeat;
          padding-bottom: 3px;
          margin-bottom: 16px;
          width: 249px;
        }
        div#blog-container div#sidebar div.side-box div.content {
          background: url(/side-box.gif) top left repeat-x #fff;
        }
        div#blog-container div#sidebar div.side-box h2 {
          display: block;
          font-family: Georgia, sans-serif;
          font-size: 123.1%;
          text-align: right;
          margin-bottom: 10px;
          width: 249px;
        }
        div#blog-container div#sidebar div.side-box h2 a {
          color: #484848;
          margin-right: 5px;
        }
        div#blog-container div#sidebar div.side-box div.content h3 {
          font-size: 85%;
          color: #8c8f91;
          margin: 8px 0;
          text-align: right;
          width: 249px;
        }
        div#blog-container div#sidebar div.side-box div.content h3 span {
          display: block;
          margin-right: 5px;
        }
        div#blog-container div#sidebar div.side-box div.content ul.archive-months li {
          padding-bottom: 2px;
          padding-right: 5px;
          text-align: right;
        }
        div#blog-container div#sidebar div.side-box div.content ul.archive-months li,
        div#blog-container div#sidebar div.side-box div.content ul.archive-months li a {
          font-family: Georgia, sans-serif;
          font-size: 100%;
          color: #484848;
          text-transform: capitalize;
        }
        div#blog-container div#sidebar div.side-box div.content ul.archive-months li a:hover {
          text-decoration: underline;
        }
        div#blog-container
          div#sidebar
          div.side-box
          div.content
          ul.archive-months
          li
          ul.archive-days {
          font-size: 85%;
          margin: 5px 0px;
        }
        div#blog-container
          div#sidebar
          div.side-box
          div.content
          ul.archive-months
          li
          ul.archive-days
          li,
        div#blog-container
          div#sidebar
          div.side-box
          div.content
          ul.archive-months
          li
          ul.archive-days
          li
          a {
          font-size: 100%;
        }
        div#blog-container div#sidebar div.tabs {
          padding: 2px 4px;
          height: 20px;
          width: 200px;
        }
        div#blog-container div#sidebar div.tabs h4,
        div#blog-container div#sidebar div.tabs a {
          display: block;
          font-family: Trebuchet MS, sans;
          padding: 0 4px;
        }
        div#blog-container div#sidebar div.tabs h4 {
          float: left;
        }
        div#blog-container div#sidebar div.tabs a {
          color: #333;
        }
        div#blog-container div#sidebar a:hover {
          text-decoration: underline;
        }
        div#blog-container div#sidebar div.track-box {
          padding: 6px;
        }
      `}</style>
    </div>
  )
}

const UserPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Blog</title>
      </Head>

      <div>
        <Suspense fallback={<Loading />}>
          <UserProfile />
        </Suspense>
      </div>
    </>
  )
}

UserPage.authenticate = false
UserPage.getLayout = (page) => <Layout>{page}</Layout>

export default UserPage
