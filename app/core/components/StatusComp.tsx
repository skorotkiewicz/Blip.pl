/* eslint-disable @next/next/no-img-element */
import { Link, useMutation, useRouter } from "blitz"
import React from "react"
import moment from "moment"
// import ReactHashtag from "app/react-hashtag"
import deleteStatus from "app/statuses/mutations/deleteStatus"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { parser } from "app/parser"
import "moment/locale/pl"

const StatusComp = ({
  id,
  username,
  avatar,
  status,
  photo,
  date,
  transport,
  setReply,
  isPublic,
}) => {
  const router = useRouter()
  const [deleteStatusMutation] = useMutation(deleteStatus)
  const currentUser = useCurrentUser()
  moment.locale("pl")

  return (
    <li key={id} id={`update-${id}`} className="update status">
      <div className="background-top">&nbsp;</div>
      <div className="container clearfix">
        <a href={`/blog/${username}/dashboard`} className="author">
          <img
            className="author"
            // width="30"
            // height="30"
            src={avatar}
            alt={`${username} - avatar`}
          />
          {/* <Image
            className="author"
            width="30"
            height="30"
            src={avatar}
            alt={`${username} - avatar`}
          /> */}
        </a>

        <div className="content">
          <span className="nick">
            {!isPublic && <span style={{ marginRight: 5 }}>🔒</span>}
            <Link href={`/blog/${username}/dashboard`}>
              <a>{username}</a>
            </Link>
            :{" "}
          </span>

          {/* <ReactHashtag
            renderHashtag={(hashtagValue: String) => (
              <Link href={`/tags/${hashtagValue.substring(1)}`}>
                <a className="hashtag">{hashtagValue}</a>
              </Link>
            )}
          >
            {status}
          </ReactHashtag> */}

          {parser(status)}

          {photo && (
            <div className="photo">
              <Link href={photo}>
                <img src={photo} alt={`default picture`} />
                {/* <Image src={photo} alt={`default picture`} /> */}
              </Link>
            </div>
          )}
        </div>

        <div className="toolbar clearfix clearer">
          <span className="clock">
            <span className="created-ago" style={{ display: "none" }}>
              {moment(date).format("YYYY-MM-DD H:i:s")}
            </span>
            <span className="">{moment(new Date(date)).fromNow()}</span>
          </span>
          <span className="transport">
            , przez{" "}
            <Link href={`/pages/help`}>
              <a>{transport}</a>
            </Link>
          </span>

          {currentUser?.name === username && setReply && (
            <div style={{ float: "right" }}>
              <span
                className="oClick"
                style={{ marginLeft: 10 }}
                onClick={async () => {
                  if (window.confirm("Jesteś pewny, ze chcesz usunąć ten wpis?")) {
                    await deleteStatusMutation({ id })
                    router.push("/dashboard")
                  }
                }}
              >
                usuń
              </span>
            </div>
          )}

          {setReply && (
            <div style={{ float: "right" }}>
              <span
                className="oClick"
                style={{ marginLeft: 10 }}
                onClick={() => {
                  setReply(`>${username}  /s/${id} `)
                }}
              >
                odpisz
              </span>
              <span
                className="oClick"
                style={{ marginLeft: 10 }}
                onClick={() => {
                  setReply(`>>${username} /s/${id} `)
                }}
              >
                odpisz prywatnie
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="background-bottom">&nbsp;</div>
    </li>
  )
}

export default StatusComp
